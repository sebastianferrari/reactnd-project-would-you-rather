import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { addAnswer as addAnswerToUserAtArray } from './users'
import { addAnswerToLoggedUser } from './loggedUser'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

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

function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    qid,
    authedUser,
    answer
  }
}

export function handleAddQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(addQuestionAnswer(info))
    dispatch(addAnswerToUserAtArray(info))
    dispatch(addAnswerToLoggedUser(info))

    return saveQuestionAnswer(info)
      .then(() => dispatch(hideLoading()))
  }
}