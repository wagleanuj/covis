import knex, {Knex} from "knex"
import config from "./knexfile"
const isTest = process.env.NODE_ENV === 'test'
const isDev = process.env.NODE_ENV ==='developement'
export default knex(isTest? config.test : (true? config.development: config.production))