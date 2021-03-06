import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionSummary from "./QuestionSummary";

class Dashboard extends Component {

  state = {
    // Unanswered vs answered
    activeQuestion: 'unanswered'
  }

  toggleQuestion = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      activeQuestion: prevState.activeQuestion === 'answered'
        ? 'unanswered'
        : 'answered'
    }))
  }

  render() {
    const { questions, authedUser, questionIds } = this.props
    const { activeQuestion } = this.state
    // Filter in active questions.
    const activeQuestionIds = questionIds.filter((id) => {
      const currentQuestion = questions[id]
      const answeredByUser = currentQuestion.optionOneText.votes.includes(authedUser)
        || currentQuestion.optionTwoText.votes.includes(authedUser)
      // if the current state is answered, then I only want questionIds
      // where the answeredByUser value is true.
      if (activeQuestion === 'answered' && answeredByUser) {
        return true
      }
      // Otherwise, if state is unanswered and not answeredByUser... you get it.
      else if (activeQuestion === 'unanswered' && !answeredByUser) {
        return true
      }
      // Filter out.
      else {
        return false
      }
    })

    return (
      <Fragment>
        <h3 className='center'>Would you rather?</h3>
        <div className='dashboard'>
          <ul className='active-question-container'>
            {
              activeQuestion === 'answered'
                ? <li
                  className='inactive-question'
                  onClick={this.toggleQuestion}
                >Unanswered</li>
                : <li className='active-question'>Unanswered</li>
            }
            {
              activeQuestion === 'unanswered'
                ? <li
                  className='inactive-question'
                  onClick={this.toggleQuestion}
                >Answered</li>
                : <li className='active-question'>Answered</li>
            }
          </ul>

          {
            activeQuestionIds.length !== 0
              ?
              <ul className='dashboard-list'>
                {
                  activeQuestionIds.map((id) => (
                    <li key={id}>
                      <QuestionSummary id={id}/>
                    </li>
                  ))
                }
              </ul>
              :
              <p className='center'>No {activeQuestion} questions, you should consider
                {activeQuestion === 'answered'
                  ? ' answering some'
                  : ' asking more'}!</p>
          }
        </div>
      </Fragment>
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