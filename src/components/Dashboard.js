import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import QuestionSummary from "./QuestionSummary";

class Dashboard extends Component {

  state = {
    // Unanswered vs answered
    activeQuestion: 'answered'
  }

  render() {
    const { questions, authedUser, questionIds } = this.props
    const { activeQuestion } = this.state
    // Filter out non-active questions.
    const activeQuestionIds = questionIds.filter((id) => {
      const currentQuestion = questions[id]
      const answeredByUser = currentQuestion.optionOne.votes.includes(authedUser)
        || currentQuestion.optionTwo.votes.includes(authedUser)
      // if the current state is unanswered, then I only want questionIds
      // where the answeredByUser value is false.
      if (activeQuestion === 'answered' && answeredByUser) {
        return true
      }
      // Otherwise, if state is unanswered and not answerdByUser, you get it.
      else if (activeQuestion === 'unanswered' && !answeredByUser) {
        return true
      }
      // Filter out.
      else {
        return false
      }
    })

    return (
      <div className='dashboard'>
        <ul className='active-question-container'>
          {
            activeQuestion === 'unanswered'
              ? <li className='active-question'>
                <a href='#'>Unanswered</a>
              </li>
              : <li className='inactive-question'>Unanswered</li>
          }
          {
            activeQuestion === 'answered'
              ? <li className='active-question'>
                <a href='#' className='active-question'>Answered</a>
              </li>
              : <li className='inactive-question'>Answered</li>
          }
        </ul>

        <ul className='dashboard-list'>
          {
            activeQuestionIds.map((id) => (
              <li key={id}>
                <QuestionSummary id={id}/>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, authedUser }) => ({
  questions,
  authedUser,
  questionIds: Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
})

export default connect(mapStateToProps)(Dashboard)