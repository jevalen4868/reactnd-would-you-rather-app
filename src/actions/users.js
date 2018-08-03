import { hideLoading, showLoading } from "react-redux-loading";
import { _saveUser } from "../utils/_DATA";

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export function saveUserAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_USER_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export const handleAddUser = ({id, name, avatarURL}) => {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveUser({ id, name, avatarURL })
      .then((user) => {
        dispatch(addUser(user))
        dispatch(hideLoading())
      })
  }
}