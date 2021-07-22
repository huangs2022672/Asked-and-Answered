import axios from 'axios';

export const fetchAnswers = (questionId) => {
    return axios.get(`/api/questions/${questionId}/answers`);
}

export const fetchAnswer = (questionId, answerId) => {
    return axios.get(`/api/questions/${questionId}/answers/${answerId}`);
}

export const createAnswer = (questionId, answer) => {
    return axios.post(`/api/questions/${questionId}`, answer);
}

export const updateAnswer = (questionId, answer) => {
    return axios.patch(`/api/questions/${questionId}/answers/${answer.id}`, answer);
}

export const deleteAnswer = (questionId, answerId) => {
    return axios.delete(`/api/questions/${questionId}/answers/${answerId}`);
}