const db = require('../db/client')
const { validationResult } = require('express-validator');


// ========================================>> GET:ALL:USERS
exports.list_all_users = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users')
  res.send(rows)
  }

// ========================================>> GET:ID:USER
exports.find_one_user = async (req, res) => {
  const {id} = req.params
  const querySelection = {
      text: `
          SELECT * FROM users
          WHERE id = $1;
       `,
      values: [id]}

  try {
      const { rows } = await db.query(querySelection)
      res.send(rows)
  } catch (e) {
      res.status(404).send("User not found")
  }
}


// ========================================>> POST
exports.post_user = async (req, res) => {

  const errors = validationResult(req) 
      if(!errors.isEmpty()){ 
          return res.status(422).send({errors}) 
      }
  const { first_name, last_name, image, email, password } = req.body

  const create = {
      text: `
          INSERT INTO tags (first_name, last_name, image, email, password, active)
          VALUES($1, $2, $3, $4, $5, true)
          RETURNING *;
       `,
      values: [first_name, last_name, image, email, password]
  }

  try {
      const { rows } = await db.query(create)
      res.send(rows)
  } catch (e) {
      res.status(500).send(e)
  }
}