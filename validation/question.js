const Validator  = require('validator')
const validText = require('./valid-text')

module.exports = function validateQuestionInput(data){
    let errors = {};

    data.title = validText(data.title) ? data.title : "";
    data.body = validText(data.body) ? data.body : "";

    if (!Validator.isLength(data.body, {min: 2, max: 5000})){
        errors.body = 'Body must be between 2 and 5000 characters';
    }
    if (!Validator.isLength(data.title, {min: 2, max: 888})){
        errors.title = 'Title cannot be longer than 888 characters';
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}