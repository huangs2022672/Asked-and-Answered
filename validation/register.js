const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data){
    let errors = {}
    
    data.name = validText(data.name) ? data.name : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';
    data.role = validText(data.role) ? data.role : "";

    if (!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    if (Validator.isEmpty(data.role)) {
        errors.role = 'Role cannot be empty';
    }
    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}