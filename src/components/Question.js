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

class Question extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('form', e)
  }

  render() {
    const { question, authedUser, askedByUser } = this.props
    return (
      <div>
        <h3 className='question-ask'>
          {question.author === authedUser
            ? 'You ask'
            : `${askedByUser.name} asks`}</h3>

        <img
          src={askedByUser.avatarURL}
          alt={`Avatar of ${askedByUser.name}`}
          className='avatar'
        />

        <h4 className='question-text'>
          Would you rather....
        </h4>

        <form id='question-form' onSubmit={this.handleSubmit}>
          <input
            type='radio'
            name='options'
            value='optionOne'
          />
          {question.optionOne.text}
          <br/>
          <input
            type='radio'
            name="options"
            value='optionTwo'
          />
          {question.optionTwo.text}
          <br/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id, answered }) => {
  const question = questions[id]
  const askedByUser = users[question.author]
  return {
    authedUser,
    askedByUser,
    question: question
      ? question
      : null,
    answered,
  }
}

export default connect(mapStateToProps)(Question)