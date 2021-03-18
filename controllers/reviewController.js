const db = require('../db/client')
const { validationResult } = require('express-validator');

// ========================================>> GET:ALL:REVIEWS
exports.list_all_reviews = async (req, res) => {

  const querySelection = `SELECT * FROM reviews`

  const { rows } = await db.query(querySelection)
  res.send(rows)
  }

// ========================================>> GET:ID:REVIEW
exports.find_one_review = async (req, res) => {
  const {id} = req.params
  const querySelection = {
      text: `
        SELECT *
        FROM reviews
        WHERE id = $1;
       `,
      values: [id]}

  try {
      const { rows } = await db.query(querySelection)
      res.send(rows)
  } catch (e) {
      res.status(404).send("Review not found")
  }
}


// ========================================>> POST
exports.post_review = async (req, res) => {

    const errors = validationResult(req) 
        if(!errors.isEmpty()){ 
            return res.status(422).send({errors}) 
        }
    const { user_id, title, comment, restaurant_id, rating } = req.body

    const create = {
        text: `
            INSERT INTO reviews (user_id, title, comment, restaurant_id, rating)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
         `,
        values: [user_id, title, comment, restaurant_id, rating]
    }

    try {
        const { rows } = await db.query(create)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e)
    }
}