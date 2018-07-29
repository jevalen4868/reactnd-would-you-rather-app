import { hideLoading, showLoading } from "react-redux-loading";
import { _saveQuestion } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_VOTE = 'SAVE_QUESTION_VOTE'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  }
}

export function saveQuestionVote({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_VOTE,
    authedUser,
    qid,
    answer,
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
      .then((question) => dispatch(saveQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
