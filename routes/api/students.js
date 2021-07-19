const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const Student = require('../../models/Student')
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

router.get('/current', passport.authenticate('jwt', {session: false}, (req, res) => {
    res.json({
        id: req.student.id,
        name: req.student.name,
        email: req.student.email
    });
}))

router.post('/register', (req, res) => {
    const {errors, isValid} =  validateRegisterInput(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }

    Student.findOne({ email: req.body.email })
        .then(student => {
        if (student) {
            errors.email = 'Email already exists'
            return res.status(400).json(errors)
        } else {
            const newStudent = new Student({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
                if (err) throw err;
                newStudent.password = hash;
                newStudent.save()
                    .then(student => {
                        const payload = {id: student.id, name: student.name};

                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) =>{
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    })

            })
            })
        }
        })
})

router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    console.log(errors);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Student.findOne({email})
        .then(student => {
            if (!student) {
                return res.status(404).json({email: 'This student does not exist'});
            }

        bcrypt.compare(password, student.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: student.id, name: student.name};
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                } else {
                    return res.status(400).json({password: 'Incorrect password'});
                }
            })
        })
})
module.exports = router