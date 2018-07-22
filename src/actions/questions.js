import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(option1Text, option2Text) {
  return (dispatch, getState) => {
    const { loggedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText: option1Text,
      optionTwoText: option2Text,
      author: loggedUser.id
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}