import fetch from "node-fetch";
import { parseFile, parse } from "fast-csv";
import knex from "./knex";
import { columns } from "./columns";

export const TABLE_NAMES = {
  DATA: "covis-data",
  COUNTRIES: "covis-countries",
};
export class DataUtils {
  static async createTable(dataTableColumns: string[] = columns) {
    if (!(await knex.schema.hasTable(TABLE_NAMES.DATA))) {
      console.log("Creating Table");
      const NAMES = new Set(["iso_code", "continent", "location"]);
      await knex.schema.createTable(TABLE_NAMES.DATA, (table) => {
        console.log("Seeding...");
        for (let col of dataTableColumns) {
          if (NAMES.has(col)) table.string(col);
          else if (col === "date") table.date(col);
          else table.double(col);
        }
      });
    }
  }

  static dropTable() {}

  static fetchColumns() {
    fetch(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-codebook.csv"
    );
  }

  static async parseFromCSV() {
    return new Promise((resolve, reject) => {
      let rows = [];
      let batches = [];
      let index = 0;
      fetch(
        "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv"
      ).then((res) => {
        res.body
          .pipe(
            parse({
              delimiter: ";",
              quote: null,
              renameHeaders: false,
              headers: true,
              objectMode: true,
            })
          )
          .on("data", (row) => {
            const key = Object.keys(row)[0];
            const val = row[key];
            const keys = key.split(",");
            rows.push(this.createRow(keys, val.split(",")));
            if (index % 100 === 0){
              batches.push(knex(TABLE_NAMES.DATA).insert(rows.slice(0)));
              rows = [];
            }
            index = index + 1;
          })
          .on("error", reject)
          .on("end", () => {
            console.log('ended')
            Promise.all(batches).then(resolve);
          });
      });
    });
  }

  static createRow(keys: string[], values: string[]) {
    const obj = {};
    for (let k in keys) {
      const key = keys[k];
      const val = values[k];
      obj[key] = val;
    }
    return obj;
  }
}
