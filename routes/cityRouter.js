const express = require('express');
const router = express.Router();

const cityController = require('../controllers/cityController');

router.get("/", cityController.list_all_cities);
router.get("/:id", cityController.find_one_city);

module.exports = router;