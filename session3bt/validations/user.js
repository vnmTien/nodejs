const joi = require("joi");

const signUpValidator = joi.object({
    username: joi.string().required().messages({
        "string.empty": "Username cannot empty",
        "any.require": "Username is required",
    }),
    password: joi.string().required().min(6).max(32).messages({
        "string.empty": "Password cannot empty",
        "any.require": "Password is required",
        "string.min": "Password at least 6 characters",
        "string.max": "Password at most 32 characters"
    })
});

const signInValidator = joi.object({
    username: joi.string().required().messages({
        "string.empty": "Username cannot empty",
        "any.require": "Username is required",
    }),
    password: joi.string().required().min(6).max(32).messages({
        "string.empty": "Password cannot empty",
        "any.require": "Password is required",
        "string.min": "Password at least 6 characters",
        "string.max": "Password at most 32 characters"
    })
});

module.exports = {
    signUpValidator,
    signInValidator
}

