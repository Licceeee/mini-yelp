const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const { validateFirstName, validateLastName, validateEmail, validatePassword } = require('../validators') 

router.get("/", userController.list_all_users);
router.get("/:id", userController.find_one_user);
router.post("/", [validateFirstName, validateLastName, validateEmail, validatePassword], 
        userController.post_user);

module.exports = router;