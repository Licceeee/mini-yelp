const db = require('../db/client')
const { validationResult } = require('express-validator');

// ========================================>> GET:ALL:TAGS
exports.list_all_tags = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM tags')
  res.send(rows)
  }

// ========================================>> GET:ID:TAG
exports.find_one_tag = async (req, res) => {
  const {id} = req.params
  const querySelection = {
      text: `
          SELECT * FROM tags
          WHERE id = $1;
       `,
      values: [id]}

  try {
      const { rows } = await db.query(querySelection)
      res.send(rows)
  } catch (e) {
      res.status(404).send("Tag not found")
  }
}

// ========================================>> POST
exports.post_tag = async (req, res) => {

  const errors = validationResult(req) 
      if(!errors.isEmpty()){ 
          return res.status(422).send({errors}) 
      }
  const { name } = req.body

  const create = {
      text: `
          INSERT INTO tags (name)
          VALUES($1)
          RETURNING *;
       `,
      values: [name]
  }

  try {
      const { rows } = await db.query(create)
      res.send(rows)
  } catch (e) {
      res.status(500).send(e)
  }
}