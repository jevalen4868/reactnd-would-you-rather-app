import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { UserInfo } from "./UserInfo";

/*
 "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOneText: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwoText: {
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

        <UserInfo
          userId={askedByUser.id}
          userLabel={question.author === authedUser
            ? 'You ask'
            : `${askedByUser.name} asks`}
          avatarURL={askedByUser.avatarURL}
        />

        <div className='question-info'>
          <h4>
            Would you rather....
          </h4>

          <p>
            {question.optionOneText.text}
          </p>

          <p>
            {question.optionTwoText.text}
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