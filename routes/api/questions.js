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

// NEED MORE TESTING :(
router.get('/pending', (req, res) => {
    Question.find({ resolved: false})
        .then( questions => {
            // const filteredQuestions = questions.filter(question => 
            //         question.assigned_to !== null
            //     )
            // res.json(filteredQuestions)
             res.json(questions)
        })
        .catch(err =>  res.status(404).json({ error: "/pending not found" }))
});

// NEED MORE TESTING :(
router.get('/unassigned', (req, res) => {
    Question.find({ assigned_to: null })
        .then( questions => res.json(questions))
        .catch(err => res.status(404).json({ error: "/unassigned not found"}))
});

router.get('/user/:user_id', (req, res) => {
    User.findById(req.params.user_id)
        .then(user => {
            if (user.role === "instructor") {
                Question.find(({ assigned_to: req.params.user_id }))
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
            .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))
})


router.patch('/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const {errors, isValid} = validateQuestionInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }
        Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
        }, {new: true})
            .then(question => {
                console.log(question)
                return (
                     res.json(question)
                )
            })
            .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))
})


router.patch('/:id/assign',
passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const question = await Question.findById(req.params.id)

    if (question.assigned_to) {
        question.assigned_to = null;
    } else {
        question.assigned_to = req.user.id;
    }
    question.save()
    .then(question => res.json(question))
    .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))
})



router.patch('/:id/resolve',
passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const question = await Question.findById(req.params.id)
    
    if (question.resolved) {
        question.resolved = false;
    } else {
        question.resolved = true;
    }
    question.save()
    .then(question => res.json(question))
    .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))
})


router.delete('/:id',
passport.authenticate("jwt", { session: false }),
(req, res) => {
    Question.findByIdAndDelete(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(404).json({noquestionfound: 'No questions found'}))
});

module.exports = router


// alternative way to update question
// router.patch('/:id/assign',
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         Question.findById(req.params.id)
//             .then(question => {

//                 if (question.assign_to) {
//                     // Question.updateOne({id: thisQuestion.id}, {assign_to: null})
//                     //     .then(question => res.json(question))
//                     //     .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))

//                     question.assign_to = null;
//                 } else {
//                     // Question.updateOne({id: thisQuestion.id}, {assign_to: req.user.id})
//                     //     .then(question => res.json(question))
//                     //     .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))

//                     question.assign_to = req.user.id;
//                 }

//                 question.save()
//                     .then(question => res.json(question))
//                     .catch(err => res.status(404).json({noquestionfound: 'Something went wrong!'}))

//             })

//         // console.log(thisQuestion)
// })