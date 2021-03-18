const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');
const { validateTagName } = require('../validators') 

router.get("/", tagController.list_all_tags);
router.get("/:id", tagController.find_one_tag);
router.post("/", [validateTagName], tagController.post_tag);

module.exports = router;