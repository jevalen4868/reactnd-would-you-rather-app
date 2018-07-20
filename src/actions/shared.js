import { _getQuestions as getQuestions } from "../utils/_DATA";
import { hideLoading, showLoading } from "react-redux-loading";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions } from "./questions";


export function handleInitialData(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getQuestions()
      .then((questions) => {
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(id))
        dispatch(hideLoading())
      })
  }
}