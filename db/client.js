require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool()

console.log("connected?")

module.exports = {
    query: (text, params) => pool.query(text, params),

}