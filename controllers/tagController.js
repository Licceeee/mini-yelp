const db = require('../db/client')

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
      res.status(404).send("City not found")
  }
}

