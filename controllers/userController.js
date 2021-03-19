const db = require('../db/client')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

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

  const encryptedPassword = await bcrypt.hash(password, 10)

  const create = {
      text: `
          INSERT INTO users (first_name, last_name, image, email, password)
          VALUES($1, $2, $3, $4, $5)
          RETURNING *;
       `,
      values: [first_name, last_name, image, email, encryptedPassword]
  }

  try {
      const { rows } = await db.query(create)
      res.send(rows)
  } catch (e) {
      res.status(500).send(e)
  }
}