import { SET_LOGGED_USER } from "../actions/loggedUser";

export default function loggedUser(state = null, action) {
  console.log('Reducer: loggedUser -> ', action)
  switch (action.type) {
    case SET_LOGGED_USER:
      console.log('action.loggedUser: ', action.loggedUser)
      return action.loggedUser
    default:
      return state
  }
}