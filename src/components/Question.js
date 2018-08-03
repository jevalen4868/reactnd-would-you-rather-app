import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveUserQuestionAnswer } from "../actions/shared";

/*
Controlled component, to manage the radio button selected.
 */
class Question extends Component {

  state = {
    answer: ''
  }

  handleClick = (e) => {
    let answer = e.target.value
    this.setState(() => ({
      answer,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, qid } = this.props
    const { answer } = this.state
    dispatch(saveUserQuestionAnswer({ authedUser, qid, answer }))
    this.setState(() => ({
      answer: '',
    }))
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
            className='avatar'
            alt=''
          />
        </div>

        <div className='question-info'>
          <h4 className='question-text'>
            Would you rather....
          </h4>

          <form id='question-form' onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <input
                  type='radio'
                  name='options'
                  value='optionOneText'
                  onClick={this.handleClick}
                />
                {question.optionOneText.text}
              </li>
              <li>
                <input
                  type='radio'
                  name="options"
                  value='optionTwoText'
                  onClick={this.handleClick}
                />
                {question.optionTwoText.text}
              </li>
            </ul>
            <button className='btn'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { qid }) => {
  const question = questions[qid]
  const askedByUser = users[question.author]
  return {
    authedUser,
    askedByUser,
    question: question
      ? question
      : null,
  }
}

export default connect(mapStateToProps)(Question)