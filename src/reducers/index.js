import { combineReducers } from 'redux'
import loggedUser from './loggedUser'
import { loadingBarReducer } from 'react-redux-loading'
import users from './users'

export default combineReducers({
  loggedUser,
  users,
  loadingBar: loadingBarReducer
})