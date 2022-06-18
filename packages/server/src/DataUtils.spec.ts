import {DataUtils} from "./DataUtils"
import knex from "./knex"
jest.setTimeout(919191919)
afterAll(async ()=>{
    await knex.destroy()
})
test('checks stuff', async ()=>{
    await DataUtils.createTable()
    await DataUtils.parseFromCSV()
})