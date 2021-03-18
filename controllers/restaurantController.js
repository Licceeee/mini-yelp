const db = require('../db/client')

// TODO ADD VALIDATION (min max) middleware for rating (1-5)

// ========================================>> GET:ALL:RESTAURANTS
exports.list_all_restaurants = async (req, res) => {

  // TODO display city_id as city name
  const selectRestaurants = `
    SELECT *
    FROM restaurants
    JOIN cities
    ON restaurants.city_id=cities.id
  `


  const { rows } = await db.query(selectRestaurants)
  res.send(rows)
  }

// ========================================>> GET:ID:RESTAURANT
exports.find_one_restaurant = async (req, res) => {
  const {id} = req.params
  const querySelection = {
      text: `
        SELECT *
        FROM restaurants
        JOIN cities
        ON restaurants.city_id=cities.id
        WHERE restaurants.id = $1;
       `,
      values: [id]}

  try {
      const { rows } = await db.query(querySelection)
      res.send(rows)
  } catch (e) {
      res.status(404).send("Restaurant not found")
  }
}