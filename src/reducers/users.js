import { ADD_USER, RECEIVE_USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION } from '../actions/users'

export default function users(state = {}, action) {
  const { authedUser } = action
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case SAVE_USER_ANSWER :
      const { qid, answer } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        }
      }
    case ADD_USER :
      const user = action.user
      return {
        ...state,
        [user.id]: user,
      }
    case SAVE_USER_QUESTION:
      const { qId } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([qId])
        }
      }
    default:
      return state;
  }
}