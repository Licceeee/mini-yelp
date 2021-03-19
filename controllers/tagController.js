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
  const getTag = {
      text: `
          SELECT * FROM tags
          WHERE id = $1;
       `,
      values: [id]
  }

  const getRestaurants = {
    text: `
        SELECT r.id, r.name
        FROM restaurants as r 
        JOIN restaurant_to_tag as r2t ON r.id = r2t.restaurant_id
        JOIN tags as t ON r2t.tag_id = t.id 
        WHERE r.id=$1
      `,
      values: [id]
  }
    
  try {
      const { rows: tagRows } = await db.query(getTag)
      if (!tagRows.length) {
        return res.sendStatus(404)
      }

      const { rows: restaurantRows } = await db.query(getRestaurants)

      if (restaurantRows) {
          tagRows[0].restaurants = restaurantRows
      }
      res.send(tagRows[0])

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


// ========================================>> GET:ALL:M2M
exports.list_all_m2m = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM restaurant_to_tag')
  res.send(rows)
  }

// ========================================>> POST:Many2Many
exports.post_restaurant_to_tag = async (req, res) => {

  const errors = validationResult(req) 
      if(!errors.isEmpty()){ 
          return res.status(422).send({errors}) 
      }
  const { restaurant_id, tag_id } = req.body

  const create = {
      text: `
          INSERT INTO restaurant_to_tag (restaurant_id, tag_id)
          VALUES($1, $2)
          RETURNING *;
       `,
      values: [restaurant_id, tag_id]
  }

  try {
      const { rows } = await db.query(create)
      res.send(rows)
  } catch (e) {
      res.status(500).send(e)
  }
}