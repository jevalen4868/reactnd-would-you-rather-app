import React, { Component } from 'react'
import { connect } from 'react-redux'

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

  buttonClick = (e) => {
    e.preventDefault()
  }

  render() {
    const { question, authedUser, askedByUser } = this.props
    return (
      <div className='question'>
        <div className='question-user-info'>
          <h3>
            {question.author === authedUser
              ? 'You ask'
              : `${askedByUser.name} asks`}</h3>

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

          <button onClick={this.buttonClick}>View Question</button>
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

export default connect(mapStateToProps)(QuestionSummary)