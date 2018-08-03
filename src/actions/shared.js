import { _getQuestions as getQuestions, _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { hideLoading, showLoading } from "react-redux-loading";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions, saveQuestion, saveQuestionVote } from "./questions";
import { saveUserAnswer } from "./users";


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

export const saveUserQuestionAnswer = (info) => {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveQuestionAnswer(info)
      .then(() => {
        dispatch(saveUserAnswer(info))
        dispatch(saveQuestionVote(info))
        dispatch(hideLoading())
      })
  }
}

export const handleSaveQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {
        dispatch(saveQuestion(question))
        dispatch(hideLoading())
      })
  }
}