import { 
  RECEIVE_USERS,
  ADD_ANSWER
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      } 
    case ADD_ANSWER:
      console.log('ACTION FROM USERS REDUCER ==> ', action)
      console.log('STATE FROM USERS REDUCER ==> ', state)
      const { authedUser, qid, answer } = action

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: Object.assign({ [qid]: answer }, state[authedUser].answers)
        }
      }
    default:
      return state
  }
}