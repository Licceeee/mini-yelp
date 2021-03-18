const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get("/", userController.list_all_users);
router.get("/:id", userController.find_one_user);

module.exports = router;