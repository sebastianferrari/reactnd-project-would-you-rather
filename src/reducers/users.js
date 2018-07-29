import { 
  RECEIVE_USERS,
  ADD_ANSWER,
  ADD_QUESTION_TO_USER_QUESTIONS
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      } 
    case ADD_ANSWER:
      const { authedUser, qid, answer } = action

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: Object.assign({ [qid]: answer }, state[authedUser].answers)
        }
      }
    case ADD_QUESTION_TO_USER_QUESTIONS:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: [ ...state[action.authedUser].questions, action.qid ]
        }
      }
    default:
      return state
  }
}