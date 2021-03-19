const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');
const { validateTagName, validateRestaurantId, validateTagId } = require('../validators') 

router.get("/", tagController.list_all_tags);
router.get("/:id", tagController.find_one_tag);
router.post("/", [validateTagName], tagController.post_tag);

router.get("/m2m", tagController.list_all_m2m);
router.post("/m2m", [validateRestaurantId, validateTagId], 
                    tagController.post_restaurant_to_tag);

module.exports = router;