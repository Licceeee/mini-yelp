const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

router.get("/", restaurantController.list_all_restaurants);
router.get("/:id", restaurantController.find_one_restaurant);

module.exports = router;