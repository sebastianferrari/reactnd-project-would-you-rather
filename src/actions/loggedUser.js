import {
  SET_LOGGED_USER,
  ADD_ANSWER_TO_LOGGED_USER
} from './actionTypes'

function setLoggedUser (loggedUser) {
  return {
    type: SET_LOGGED_USER,
    loggedUser
  }
}

export function handleSetLoggedUser(loggedUser) {
  return (dispatch) => {
    dispatch(setLoggedUser(loggedUser))
  }
}

export function addAnswerToLoggedUser({ answer, qid }) {
  return {
    type: ADD_ANSWER_TO_LOGGED_USER,
    answer,
    qid
  }
}