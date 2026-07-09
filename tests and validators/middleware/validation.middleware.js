const { body, validationResult} = require('express-validator');

async function validateResult(req,res,next) {
    const errors = validateResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json({ errors : errors.array() })
    }

    next();
}


const registerUserValidationRules = [
    body('username')
        .isString()
        .withMessage('Username must be string')
        .isLength({ min: 3, max : 20})
        .withMessage('also must be 3 to 20 characters '),
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({min : 4,max: 15}),
    validateResult
]

module.exports = {registerUserValidationRules};

