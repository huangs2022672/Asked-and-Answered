const Validator  = require('validator');
const validText = require('./valid-text');

module.exports = function validateQuestionInput(data){
    let errors = {};

    data.body = validText(data.body) ? data.body : "";

    if (!Validator.isLength(data.body, {min: 2, max: 2000})){
        errors.body = 'Body must be between 2 and 2000 characters';
    }


    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};