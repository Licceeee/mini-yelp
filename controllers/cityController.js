const db = require('../db/client')

// ========================================>> GET:ALL:CITIES
exports.list_all_cities = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM cities')
  res.send(rows)
  }

// ========================================>> GET:ID:CITY
exports.find_one_city = async (req, res) => {
  const {id} = req.params
  const querySelection = {
      text: `
          SELECT * FROM cities
          WHERE id = $1;
       `,
      values: [id]}

  try {
      const { rows } = await db.query(querySelection)
      res.send(rows)
  } catch (e) {
      res.status(404).send("City not found")
  }
  }

