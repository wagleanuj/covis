import fetch from "node-fetch"
import { parseFile, parse } from 'fast-csv';
import knex from "./knex";
import { columns } from "./columns";

const TABLE_NAMES = {
    DATA: 'covis-data',
    COUNTRIES: 'covis-countries'
}
export class DataUtils {

    static async createTable(dataTableColumns: string[] = columns) {
        if(!await knex.schema.hasTable(TABLE_NAMES.DATA)){
            console.log('creating table')
            await knex.schema.createTable(TABLE_NAMES.DATA, table=>{
                for(let col of dataTableColumns){
                    table.text(col)
                }
            })
        }
  
    }

    static dropTable() {

    }

    static fetchColumns() {
        fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-codebook.csv',)
    }

    static async parseFromCSV() {
        return new Promise((resolve, reject)=>{
            let promises = [];

            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv').then(res => {
                res.body.pipe(parse({
                    delimiter: ";",
                    quote: null,
                    renameHeaders: false,
                    headers: true,
                    objectMode: true,
                }))
                .on('data',(row)=>{
                    const key = Object.keys(row)[0];
                    const val = row[key];
                    const keys = key.split(',');
                    promises.push(this.fillTable(keys, val.split(",")))
                })
                .on('error', reject)
                .on('end', ()=>{
                    console.log('stream ended')
                    Promise.all(promises).then(resolve);
                })
            })
        })
         
    }


    static async fillTable(keys: string[], values: string[]){
        const obj = {};
        for(let k in keys){
            const key = keys[k];
            const val = values[k];
            obj[key] = val;
        }
        await knex(TABLE_NAMES.DATA).insert(obj);
    }


}

