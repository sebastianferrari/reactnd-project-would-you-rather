import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import loggedUser from './loggedUser'
import users from './users'
import questions from './questions'

export default combineReducers({
  loggedUser,
  users,
  loadingBar: loadingBarReducer,
  questions
})