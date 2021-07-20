const express = require("express")
const router = express.Router()
const Question = require('../../models/Question')
const passport = require('passport');
const validateQuestionInput = require('../../validation/question');
const User = require("../../models/User");

// router.get("/test", (req, res) => res.json({msg: "This is the questions route"}))

router.get('/resolved', (req, res) => {
    Question.find({ resolved: true})
        .sort({date: -1})
        .then( questions => res.json(questions))
        .catch(err =>  res.status(404).json({ error: "/resolved not found" }))
});

router.get('/pending', (req, res) => {
    Question.find({ resolved: false})
        .then( questions => res.json(questions))
        .catch(err =>  res.status(404).json({ error: "/pending not found" }))
});

router.get('/unassigned', (req, res) => {
    Question.find({ assigned_to: null })
        .then( questions => res.json(questions))
        .catch(err => res.status(404).json({ error: "/unassigned not found"}))
});

// tested but not successful
router.get('/user/:user_id', (req, res) => {
    User.findById(req.params.user_id)
        .then(user => {
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
        .catch(err => res.status(404).json({ nouserfound: 'No user found' }));

})

// not tested
router.get('/:id', (req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(404).json({ noquestionfound: 'No question found' }));
});

router.post('/',
    passport.authenticate("jwt", { session: false }),
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

        newQuestion.save()
            .then(question => res.json(question))
})

module.exports = router
