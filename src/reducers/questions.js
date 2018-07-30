import { 
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_QUESTION_ANSWER
} from "../actions/actionTypes";

export default function questions(state = [], action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionOne: {
            ...state[action.qid].optionOne,
            votes: action.answer === 'optionOne'
              ? state[action.qid].optionOne.votes.concat([action.authedUser])
              : state[action.qid].optionOne.votes
          },
          optionTwo: {
            ...state[action.qid].optionTwo,
            votes: action.answer === 'optionTwo'
              ? state[action.qid].optionTwo.votes.concat([action.authedUser])
              : state[action.qid].optionTwo.votes
          }
        }
      }
    default:
      return state
  }
}