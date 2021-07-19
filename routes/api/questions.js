const express = require("express")
const router = express.Router()
const Question = require('../../models/Question')
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateQuestionInput = require('../../validation/question');
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({msg: "This is the questions route"}))

router.get('/current', passport.authenticate('jwt', {session: false}, (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}))

router.get('/resolved', (req, res) => {
    Question.find({ resolved: true})
        .sort({date: -1})
        .then( questions => res.json(questions))
        .catch(err =>  res.status(404).json({ questionsNotFound: "No questions found" }))

});
router.get('/pending', (req, res) => {
    Question.find({ resolved: false})
    .then( questions => res.json(questions))
    .catch(err =>  res.status(404).json({ questionsNotFound: "No questions pending" }))
});

router.get('/unassigned', (req, res) => {
    Question.find({ assigned_to: null })
    .then( questions => res.json(questions))
    .catch(err => res.status(404).json({ questionsNotFound: "No questions unassigned"}))
});

router.get('/user/:user_id', (req, res) => {
    user = User.find({ user: req.params.user_id  }) 

    if (user.role === "instructor") {
        Question.find(({ assign_to: req.params.user_id }))
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ questionsNotFound: "No questions found" }))
    } else if (user.role === "student") {
        Question.find({ author: req.params.user_id})
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ questionsNotFound: "No questions found" }))
    }
})



router.post(
    '/', 
    passport.authenticate("jwt", 
    { session: false }),
    (req, res) => {
        const {errors, isValid} = validateQuestionInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }
        const newQuestion = new Question ({
            title: req.body.title,
            body: req.body.body,
            author: req.user.id, // how does this make sense??
        })

        newQuestion.saved()
            .then(question => res.json(question))
})



