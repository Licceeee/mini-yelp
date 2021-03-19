const db = require('../db/client')


// ========================================>> GET:ALL:RESTAURANTS
exports.list_all_restaurants = async (req, res) => {

  // TODO display city_id as city name
  const selectRestaurants = `
    SELECT r.id, r.name, c.name as city, r.image, r.lat, r.long, r.address, 
            r.description, COUNT(rev.id) as reviews
    FROM restaurants as r
    LEFT JOIN cities as c
    ON r.city_id=c.id
    LEFT JOIN reviews as rev
    ON rev.restaurant_id=r.id
    GROUP BY c.name, r.id
  `

  const { rows } = await db.query(selectRestaurants)
  res.send(rows)
  }

// ========================================>> GET:ID:RESTAURANT
exports.find_one_restaurant = async (req, res) => {
  const {id} = req.params
  const queryRestaurant = {
      text: `
        SELECT r.id, r.name, c.name as city, r.image, r.lat, r.long, r.address, 
        r.description
        FROM restaurants as r
        LEFT JOIN cities as c
        ON r.city_id=c.id
        WHERE r.id = $1
        GROUP BY c.name, r.id
       `,
      values: [id]}

    const getReviews = {
        text: `
          SELECT r.id, r.title, r.title, r.date, r.rating, u.id as user_id, u.first_name, u.last_name
          FROM reviews as r
          LEFT JOIN users as u
          ON r.user_id=u.id  
          WHERE restaurant_id=$1`,
        values: [id]
    }

    const getTags = {
      text: `
          SELECT tags.id, tags.name
          FROM tags 
          JOIN restaurant_to_tag as r2t ON tags.id = r2t.tag_id
          JOIN restaurants as r ON r2t.restaurant_id = r.id 
          WHERE r.id=$1
        `,
        values: [id]
    }

  try {
      const { rows: restaurantRows } = await db.query(queryRestaurant)
      if (!restaurantRows.length) {
        return res.sendStatus(404)
      }

      const { rows: reviewRows } = await db.query(getReviews)
      const { rows: tagRows } = await db.query(getTags)

  
      if (tagRows) {
        restaurantRows[0].tags = tagRows
      }
      if (reviewRows) {
        restaurantRows[0].reviews = reviewRows
      }
      res.send(restaurantRows[0])

    } catch (e) {
      res.status(404).send("Restaurant not found")
  }
}


