import { 
  SET_LOGGED_USER,
  ADD_ANSWER_TO_LOGGED_USER 
} from "../actions/loggedUser";

export default function loggedUser(state = {}, action) {
  switch (action.type) {
    case SET_LOGGED_USER:
      return action.loggedUser
    case ADD_ANSWER_TO_LOGGED_USER:
      const { qid, answer } = action

      return {
        ...state,
        answers: Object.assign({ [qid]: answer }, state.answers)
      }
    default:
      return state
  }
}