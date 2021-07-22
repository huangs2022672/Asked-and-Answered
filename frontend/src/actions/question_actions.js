import * as QuestionAPIUtil from '../util/question_api_util';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const RECEIVE_QUESTION_ERRORS = "RECEIVE_QUESTION_ERRORS";
export const REMOVE_QUESTION_ERRORS = "REMOVE_QUESTION_ERRORS";
export const QUESTION_SHOW_STATUS = "QUESTION_SHOW_STATUS";


export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const receiveQuestion = question => {
    // debugger // 2
    return {
        type: RECEIVE_QUESTION,
        question
    }
};

export const removeQuestion = questionId => ({
    type: REMOVE_QUESTION,
    questionId
})

export const receiveErrors = errors => ({
    type: RECEIVE_QUESTION_ERRORS,
    errors
});

export const removeErrors = () => ({
    type: REMOVE_QUESTION_ERRORS,
});

export const questionShowStatus = () => ({
    type: QUESTION_SHOW_STATUS,
})

export const fetchResolved = () => dispatch => {
    return (
        QuestionAPIUtil.fetchResolved()
            .then(questions => dispatch(receiveQuestions(questions)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const fetchPending = () => dispatch => {
    return (
        QuestionAPIUtil.fetchPending()
            .then(questions => dispatch(receiveQuestions(questions)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const fetchUnassigned = () => dispatch => {
    return (
        QuestionAPIUtil.fetchUnassigned()
            .then(questions => dispatch(receiveQuestions(questions)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const fetchUserQuestions = (userId) => dispatch => {
    return (
        QuestionAPIUtil.fetchUserQuestions(userId)
            .then(questions => dispatch(receiveQuestions(questions)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const fetchQuestion = (questionId) => dispatch => {
    return (
        QuestionAPIUtil.fetchQuestion(questionId)
            .then(question => dispatch(receiveQuestion(question)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const createQuestion = (question) => dispatch => {
    return (
        QuestionAPIUtil.createQuestion(question)
            .then(payload =>  {
                // debugger // 1
                return dispatch(receiveQuestion(payload))
            })
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const updateQuestion = (question) => dispatch => {
    return (
        QuestionAPIUtil.updateQuestion(question)
            .then(question => dispatch(receiveQuestion(question)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const updateAssignment = (questionId) => dispatch => {
    return (
        QuestionAPIUtil.updateAssignment(questionId)
            .then(question => dispatch(receiveQuestion(question)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const updateResolvedStatus = (questionId) => dispatch => {
    return (
        QuestionAPIUtil.updateResolvedStatus(questionId)
            .then(question => dispatch(receiveQuestion(question)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}

export const deleteQuestion = (questionId) => dispatch => {
    return (
        QuestionAPIUtil.deleteQuestion(questionId)
            .then( () => dispatch(removeQuestion(questionId)))
            .catch(err => dispatch(receiveErrors(err)))
    )
}