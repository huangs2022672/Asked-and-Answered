import * as QuestionAPIUtil from '../util/question_api_util';


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const RECEIVE_QUESTION_ERRORS = "RECEIVE_QUESTION_ERRORS";
export const REMOVE_QUESTION_ERRORS = "REMOVE_QUESTION_ERRORS";



export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
});

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



export const fetchResolved = () => dispatch => {
    QuestionAPIUtil.fetchResolved()
        .then(questions => 
            dispatch(receiveQuestions(questions))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}

export const fetchPending = () => dispatch => {
    QuestionAPIUtil.fetchPending()
        .then(questions => 
            dispatch(receiveQuestions(questions))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const fetchUnassigned = () => dispatch => {
    QuestionAPIUtil.fetchUnassigned()
        .then(questions => 
            dispatch(receiveQuestions(questions))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const fetchUserQuestions = (userId) => dispatch => {
    QuestionAPIUtil.fetchUserQuestions(userId)
        .then(questions => 
            dispatch(receiveQuestions(questions))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const fetchQuestion = (questionId) => dispatch => {
    QuestionAPIUtil.fetchUserQuestion(questionId)
        .then(question => 
            dispatch(receiveQuestion(question))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const createQuestion = (question) => dispatch => {
    QuestionAPIUtil.createQuestion(question)
        .then(question => 
            dispatch(receiveQuestion(question))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}

export const updateQuestion = (question) => dispatch => {
    QuestionAPIUtil.updateQuestion(question)
        .then(question => 
            dispatch(receiveQuestion(question))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const updateAssignment = (questionId) => dispatch => {
    QuestionAPIUtil.updateAssignment(questionId)
        .then(question => 
            dispatch(receiveQuestion(question))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const updateResolvedStatus = (questionId) => dispatch => {
    QuestionAPIUtil.updateResolvedStatus(questionId)
        .then(question => 
            dispatch(receiveQuestion(question))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}
export const deleteQuestion = (questionId) => dispatch => {
    QuestionAPIUtil.deleteQuestion(questionId)
        .then( () => 
            dispatch(removeQuestion(questionId))
        )
        .catch(err => 
            dispatch(receiveErrors(err))    
        )
}


