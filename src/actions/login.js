import { _getUsers as getUsers } from "../utils/_DATA";
import { receiveUsers } from '../actions/users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const handleLoginData = () => (dispatch) => {
  dispatch(showLoading())
  return getUsers()
    .then((users) => {
      dispatch(receiveUsers(users))
      dispatch(hideLoading())
    })
}