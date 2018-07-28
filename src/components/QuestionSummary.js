import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

/*
 "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
 */

/*
Controlled component, to manage the radio button selected.
 */
class QuestionSummary extends Component {

  buttonClick = (e, id) => {
    const { history } = this.props
    e.preventDefault()
    history.push(`/question/${id}`)
  }

  render() {
    const { question, authedUser, askedByUser } = this.props
    if(question === null ) {
      return <p>Question does not exist!</p>
    }
    return (
      <div className='question'>
        <div className='question-user-info'>
          <h4>
            {question.author === authedUser
              ? 'You ask'
              : `${askedByUser.name} asks`}
          </h4>

          <img
            src={askedByUser.avatarURL}
            alt={`Avatar of ${askedByUser.name}`}
            className='avatar'
          />
        </div>

        <div className='question-info'>
          <h4>
            Would you rather....
          </h4>

          <p>
            {question.optionOne.text}
          </p>

          <p>
            {question.optionTwo.text}
          </p>

          <button
            className='btn'
            onClick={(e) => this.buttonClick(e, question.id)}>
            View Question
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id]
  const askedByUser = users[question.author]
  return {
    authedUser,
    askedByUser,
    question: question
      ? question
      : null,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionSummary))