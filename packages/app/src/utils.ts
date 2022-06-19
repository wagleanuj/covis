import { string } from "prop-types";
import { TColumn } from "./static/types";

export function getCategories(columns: TColumn[]) {
  const cats = new Map<string, { column: string; children: TColumn[] }>();
  const blacklist = new Set(['Others']);
  columns.forEach((col) => {

    if(blacklist.has(col.category)) return;
    if (!cats.has(col.category)) {
      cats.set(col.category, { column: col.category, children: [] });
    }
    (
      cats.get(col.category) as { column: string; children: TColumn[] }
    ).children.push(col);
  });
  return cats;
}
export function removeDelim(
  st: string,
  delim: string = "_",
  joinWith: string = " "
) {
  const starr = st.split(delim);
  return starr.join(joinWith);
}
export function toTitleCase(st: string, delimToRemove: string) {
  if (delimToRemove) {
    st = removeDelim(st);
  }
  return st
    .split(" ")
    .map((a) => a[0]?.toUpperCase() + a.slice(1))
    .join(" ");
}
