import expressValidator, { body, validationResult } from "express-validator";
import logger from "./loggers.js";

const fullnameValidation = [
    body('fullname')
        .trim()
        .notEmpty().withMessage("Full Name is required.")
        .isLength({ min: 2, max: 50 }).withMessage("Full Name must be between 2 and 50 characters")
        .isString().withMessage("Full Name must contain only string")
        .escape()
];

const usernameValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 2, max: 50 }).withMessage("Username must be between 2 and 50 characters")
        .isAlphanumeric().withMessage("Username must contain string and numbers")
        .escape()
];

const emailValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail()
        .escape()
];

const phoneValidation = [
    body('phone')
        .trim()
        .notEmpty().withMessage("Phone number is required")
        .isInt().withMessage("Phone number must contain only numbers")
        .isMobilePhone({ locale: 'en-NG' }).withMessage("Phone number is Invalid")
        .escape()
];

const ageValidation = [
    body('age')
        .trim()
        .notEmpty().withMessage("Age is required")
        .isInt().withMessage("Age must contain only numbers")
        .isLength({ min: 18, max: 120 }).withMessage("Age must be between 18 and 120")
        .escape()
]

const genderValidation = [
    body('gender')
        .trim()
        .notEmpty().withMessage("Gender is required")
        .isString().withMessage("Gender must contain only alphabets")
        .escape()
];

const passwordValidation = [
    body('password')
        .trim()
        .notEmpty().withMessage("Password is required")
        .isStrongPassword({ minLength: 10, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, pointsForContainingLower: 10, pointsForContainingNumber: 0.5, pointsForContainingSymbol: 0.5, pointsForContainingUpper: 10, pointsPerRepeat: 5, pointsPerUnique: 10 }).withMessage("Password is weak")
        .isAlphanumeric().withMessage("Password must contain alphabets and numbers")
];

const allValidations = [
    fullnameValidation,
    emailValidation,
    usernameValidation,
    phoneValidation,
    ageValidation,
    genderValidation,
    passwordValidation
].flat();

const validateResult = async (req) => {
    await Promise.all(allValidations.map(chain => chain.run(req)))
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return { errors: errors.array(), isValid: false }
    }

    return { errors: [], isValid: true, sanitizedData: req.body }
}

exports = {
    validateFields: allValidations,
    fullnameValidation,
    emailValidation,
    usernameValidation,
    phoneValidation,
    genderValidation,
    passwordValidation,

    validateResult
}
