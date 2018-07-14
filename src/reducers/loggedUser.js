import { SET_LOGGED_USER } from "../actions/loggedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_LOGGED_USER:
      return action.id
    default:
      return state
  }
}