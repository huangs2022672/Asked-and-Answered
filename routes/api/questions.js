const express = require("express")
const router = express.Router()
const Question = require('../../models/Question')
const passport = require('passport');
const validateQuestionInput = require('../../validation/question');
const User = require("../../models/User");
const Answer = require('../../models/Answer');
const validateAnswerInput = require('../../validation/answer');

// router.get('/user/:user_id', (req, res) => {
//     User.findById(req.params.user_id)
//         .then(user => {
//             if (user.role === "instructor") {
//                 Question.find(({ assigned_to: req.params.user_id }))
//                     .then(questions => res.json(questions))
//                     .catch(err => res.status(404).json({ error: "issue with finding questions assigned to you" }))
//             } else if (user.role === "student") {
//                 Question.find({ author: req.params.user_id})
//                     .then(questions => res.json(questions))
//                     .catch(err => res.status(404).json({ error: "issue with finding questions you posted" }))
//             }
//         })
//         .catch(err => res.status(404).json({ error: 'cannot find user' }));
// })

router.get('/search', (req, res) => {
    Question.find({})
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ error: "cannot find question"}))
});


// WORKING // test route can be removed later
router.get("/test", (req, res) => res.json({msg: "This is the questions route"}))


// WORKING // fetches all questions
router.get('/', (req, res) => {
    Question.find({})
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ error: "cannot fetch all questions"}))
});


// WORKING // fetches all unassgined questions // unassigned meaning has not been assigned and not resolved
router.get('/unassigned', (req, res) => {
    Question.find({ assigned_to: null, resolved: false })
        .then(questions => res.json(questions))
        .catch(err => res.status(404).json({ error: "/unassigned not found" }))
});


// WORKING // fetches all pending questions // pending meaning has been assigned, but not resolved
router.get('/pending', (req, res) => {
    Question.find({ resolved: false })
        .then(questions => res.json(questions.filter(question => {
            return !!question.assigned_to
        })))
        .catch(err =>  res.status(404).json({ error: "/pending not found" }))
}); 
    
        
// WORKING // fetches all resolved questions // does not matter if assigned or not
router.get('/resolved', (req, res) => {
    Question.find({ resolved: true })
        .sort({date: 1})
        .then(questions => res.json(questions))
        .catch(err =>  res.status(404).json({ error: "/resolved not found" }))
});


// WORKING // fetches all questions relating to the user // instructors => questions assigned to them // students => questions they posted
router.get('/user/:user_id', (req, res) => {
    User.findById(req.params.user_id)
        .sort({date: 1})
        .then(user => {
            if (user.role === "instructor") {
                Question.find(({ assigned_to: req.params.user_id }))
                    .then(questions => res.json(questions))
                    .catch(err => res.status(404).json({ error: "issue with finding questions assigned to you" }))
            } else if (user.role === "student") {
                Question.find({ author: req.params.user_id})
                    .then(questions => res.json(questions))
                    .catch(err => res.status(404).json({ error: "issue with finding questions you posted" }))
            }
        })
        .catch(err => res.status(404).json({ error: 'cannot find user' }));
})


// WORKING // fetches a question by id
router.get('/:id', (req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(404).json({ error: 'cannot find question' }));
});


// WORKING // creates a new question
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
            .catch(err => res.status(404).json({ error: 'cannot post question' }))
})


// WORKING // updates the title and body of a question
router.patch('/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const {errors, isValid} = validateQuestionInput(req.body)
        // console.log(req.body.title)
        if (!isValid) {
            return res.status(400).json(errors)
        }
        Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
        }, {new: true})
            .then(question => {
                // console.log(question)
                return (
                    res.json(question)
                )
            })
            .catch(err => res.status(404).json({ error: 'cannot update question' }))
})


// WORKING // toggles the assigned_to field of a question
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
        .catch(err => res.status(404).json({ error: 'cannot update question' }))
})


// WORKING // toggles the resolved field of a question
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
        .catch(err => res.status(404).json({ error: 'cannot update question' }))
})


// WORKING // deletes a question by id
router.delete('/:id',
passport.authenticate("jwt", { session: false }),
(req, res) => {
    Question.findByIdAndDelete(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(404).json({ error: 'cannot find question'}))
});


// ANSWERS MVP

router.post('/:question_id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const {errors, isValid} = validateAnswerInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        const newAnswer = new Answer ({
            body: req.body.body,
            author: req.user.id, 
            question_id: req.params.question_id
        });

        newAnswer.save()
            .then(answer => res.json(answer))
            .catch(err => res.status(404).json({noanswerfound: 'Something went wrong!'}));
});

router.get('/:question_id/answers', (req, res) => {
    Answer.find({question_id:req.params.question_id})
        .then(answers => res.json(answers))
        .catch(err => res.status(404).json({ noanswerfound: 'No answers found' }));
});


router.patch('/:question_id/answers/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const {errors, isValid} = validateAnswerInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Answer.findByIdAndUpdate(req.params.id, {
            body: req.body.body,
            solution: req.body.solution
        }, {new: true})
            .then(answer => {
                return (
                    res.json(answer)
                );
            })
            .catch(err => res.status(404).json({noanswerfound: 'Something went wrong!'}));
});

router.delete('/:question_id/answers/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Answer.findByIdAndDelete(req.params.id)
            .then(answer => res.json(answer))
            .catch(err => res.status(404).json({noanswerfound: 'No answer found'}));
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
