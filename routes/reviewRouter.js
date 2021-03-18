const express = require('express');
const router = express.Router();
const { validateUserId, validateTitle, validateComment, validateRestaurantId,
    validateRating } = require('../validators') 

const reviewController = require('../controllers/reviewController');

router.get("/", [validateUserId, validateTitle, validateComment, validateRestaurantId,
                validateRating], reviewController.list_all_reviews);
router.get("/:id", reviewController.find_one_review);
router.post("/", reviewController.post_review);

module.exports = router;    