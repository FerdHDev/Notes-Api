import { body, validationResult } from "express-validator";

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
        .isMobilePhone(['en-NG']).withMessage("Provide a valid nigerian number.")
        .escape()
];

const ageValidation = [
    body('age')
        .trim()
        .notEmpty().withMessage("Age is required")
        .isInt().withMessage("Age must contain only numbers")
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
        .isStrongPassword({ minLength: 10, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, pointsForContainingLower: 10, pointsForContainingNumber: 0.5, pointsForContainingSymbol: 0.5, pointsForContainingUpper: 10, pointsPerRepeat: 5, pointsPerUnique: 10 }).withMessage("Password is too weak, it must contain a minimum of 10 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol")
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

export const validateRequest = async (req) => {
    await Promise.all(allValidations.map(chain => chain.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return { errors: errors.array(), isValid: false };
    }

    return { errors: [], isValid: true, sanitizedData: req.body }
}

export const validateFields = allValidations;

export default {
    fullnameValidation,
    emailValidation,
    usernameValidation,
    phoneValidation,
    genderValidation,
    passwordValidation,
} 
