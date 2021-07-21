import * as AnswerAPIUtil from '../util/answers_api_util';

export const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS'
export const RECEIVE_ANSWER = 'RECEIVE_ANSWER'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'
export const RECEIVE_ANSWER_ERRORS = 'RECEIVE_ANSWER_ERRORS'

export const receiveAnswers = answers => ({
    type: RECEIVE_ANSWERS,
    answers
})

export const receiveAnswer = answer => ({
    type: RECEIVE_ANSWER,
    answer
})

export const removeAnswer = answerId => ({
    type: REMOVE_ANSWER,
    answerId
})

export const receiveAnswerErrors = errors => ({
    type: RECEIVE_ANSWER_ERRORS,
    errors
});

export const fetchAnswers = (questionId) => dispatch => {
    AnswerAPIUtil.fetchAnswers(questionId)
        .then(answers => dispatch(receiveAnswers(answers)))
} 

export const fetchAnswer = (questionId, answerId) => dispatch => {
    AnswerAPIUtil.fetchAnswer(questionId, answerId)
        .then(answer => dispatch(receiveAnswer(answer)))
} 

export const createAnswer = (questionId, answer) => dispatch => {
    AnswerAPIUtil.createAnswer(questionId, answer)
        .then(payload => dispatch(receiveAnswer(payload)),
        (error) => dispatch(receiveAnswerErrors(error.responseJSON))
)}

export const updateAnswer = (questionId, answer) => dispatch => {
    AnswerAPIUtil.updateAnswer(questionId, answer)
        .then(payload => dispatch(receiveAnswer(payload)),
        (error) => dispatch(receiveAnswerErrors(error.responseJSON))
)}

export const deleteAnswer = (questionId, answerId) => dispatch => {
    AnswerAPIUtil.deleteAnswer(questionId, answerId)
        .then(() => dispatch(removeAnswer(answerId))
)}