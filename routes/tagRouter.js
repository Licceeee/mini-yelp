const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.get("/", tagController.list_all_tags);
router.get("/:id", tagController.find_one_tag);

module.exports = router;