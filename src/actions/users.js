import {
  RECEIVE_USERS,
  ADD_ANSWER,
  ADD_QUESTION_TO_USER_QUESTIONS
} from './actionTypes'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addAnswer({ authedUser, answer, qid }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    answer,
    qid
  }
}

export function addQuestion(authedUser, qid) {
  return {
    type: ADD_QUESTION_TO_USER_QUESTIONS,
    authedUser,
    qid
  }
}