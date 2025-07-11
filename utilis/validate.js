import validator from "validator";

const validateRegisterationInput = async (data) => {
    const errors = {};
    const clean = {};

    const rawFullname = data.fullname || "";
    const rawEmail = data.email || "";
    const rawPhone = data.phone || "";
    const rawAge = data.age || "";
    const rawGender = data.gender || "";
    const rawPassword = data.password || "";

    clean.fullname = validator.escape(validator.trim(rawFullname));
    clean.email = validator.normalizeEmail(validator.trim(rawEmail));
    clean.phone = validator.escape(validator.trim(rawPhone));
    clean.age = validator.escape(validator.trim(rawAge));
    clean.gender = validator.escape(validator.trim(rawGender));
    clean.password = validator.escape(validator.trim(rawPassword));

    if (!validator.isLength(clean.password, { min: 6, max: 30 })) {
        errors.password = "Password is too short, it should contain a minimum of 6 characters";
    } else if (!validator.isStrongPassword(clean.password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        errors.password = "Password is too weak, it should contain a minimum of 6 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
    }

    if (!validator.isMobilePhone(clean.phone, "en-NG")) {
        errors.phone = "Invalid Phone number";
    }

    return {
        errors,
        clean,
        isValid: Object.keys(errors).length === 0
    }
}


export default validateRegisterationInput;
