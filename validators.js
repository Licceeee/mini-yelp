const { check } = require('express-validator')

module.exports = {
    validateUserId: check('user_id')
        .not()
        .isEmpty()
        .withMessage("user id can't be empty")
        .isNumeric()
        .withMessage("Numbers only")
        .isLength({ min: 1 })
        .withMessage("Min length 1 chats"),
    validateTitle: check('title')
        .not()
        .isEmpty()
        .withMessage("Title can't be empty")
        .isLength({ max: 255 })
        .withMessage("Max length 255 chats"),
    validateComment: check('comment')
        .not()
        .isEmpty()
        .withMessage("Comment can't be empty"),
    validateRestaurantId: check('restaurant_id')
        .not()
        .isEmpty()
        .withMessage("user id can't be empty")
        .isNumeric()
        .withMessage("Numbers only")
        .isLength({ min: 1 })
        .withMessage("Min length 1 chats"),
    validateRating: check('rating')
        .not()
        .isEmpty()
        .withMessage("rating can't be empty")
        .isNumeric()
        .withMessage("Numbers only")
        .isFloat({min:1,max:5}),
    validateTagName: check('name')
        .not()
        .isEmpty()
        .withMessage("tag can't be empty")
        .isLength({ min: 1 })
        .withMessage("Min length 1 chars"),



    validateFirstName: check('first_name')
        .not()
        .isEmpty()
        .withMessage("firstname can't be empty")
        .isLength({ min: 1 })
        .withMessage("Min length 1 chars")
        .isAlpha()
        .withMessage("Only chars allowed"),
    validateLastName: check('first_name')
        .not()
        .isEmpty()
        .withMessage("firstname can't be empty")
        .isLength({ min: 1 })
        .withMessage("Min length 1 chars")
        .isAlpha()
        .withMessage("Only chars allowed"),

    validateEmail: check('email')
        .not()
        .isEmpty()
        .withMessage("email can't be empty")
        .isLength({ min: 5 })
        .withMessage("Min length 5 chars")
        .isEmail()
        .withMessage("Only valid mailformat allowed"),
    validatePassword: check('password')
        .not()
        .isEmpty()
        .withMessage("pw can't be empty")
        .isLength({ min: 5 })
        .withMessage("Min length 5 chars"),


    validateTagId: check('tag_id')
        .not()
        .isEmpty()
        .withMessage("tag id can't be empty")
        .isNumeric()
        .withMessage("Numbers only")
        .isLength({ min: 1 })
        .withMessage("Min length 1 chats"),
}
