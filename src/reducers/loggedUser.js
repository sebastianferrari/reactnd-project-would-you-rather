import { SET_LOGGED_USER } from "../actions/loggedUser";

export default function loggedUser(state = {}, action) {
  switch (action.type) {
    case SET_LOGGED_USER:
      return action.loggedUser
    default:
      return state
  }
}