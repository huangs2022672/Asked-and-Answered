import axios from 'axios';

export const fetchResolved = () => {
    return axios.get('/api/questions/resolved');
}

export const fetchPending = () => {
    return axios.get('api/questions/pending');
}

export const fetchUnassigned = () => {
    return axios.get('api/questions/unassigned');
}

export const fetchUserQuestions = (userId) => {
    return axios.get(`api/questions/user/${userId}`);
}

export const fetchQuestion = (questionId) => {
    return axios.get(`api/questions/${questionId}`);
}

export const createQuestion = (questionData) => {
    return axios.post('api/questions/', questionData);
}

export const updateQuestion = (questionData) => {
    debugger
    return axios.patch(`api/questions/${questionData._id}`, questionData);
}

export const updateAssignment = (questionId) => {
    return axios.patch(`/api/questions/${questionId}/assign`);
}
export const updateResolvedStatus = (questionId) => {
    return axios.patch(`/api/questions/${questionId}/resolve`);
}

export const deleteQuestion = (questionId) => {
    return axios.delete(`api/questions/${questionId}`);
}