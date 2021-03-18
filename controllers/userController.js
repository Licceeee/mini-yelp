const db = require('../db/client')

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