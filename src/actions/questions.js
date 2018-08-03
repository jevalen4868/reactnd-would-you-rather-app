export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_VOTE = 'SAVE_QUESTION_VOTE'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function saveQuestion(question) {
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