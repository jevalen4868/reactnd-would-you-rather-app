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
class Question extends Component {

  state = {
    choice: ''
  }

  handleClick = (e) => {
    let choice = e.target.value
    this.setState(() => ({
      choice,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { choice } = this.state
    console.log(choice)
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
          <h4 className='question-text'>
            Would you rather....
          </h4>

          <form id='question-form' onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <input
                  type='radio'
                  name='options'
                  value='optionOne'
                  onClick={this.handleClick}
                />
                {question.optionOne.text}
              </li>
              <li>
                <input
                  type='radio'
                  name="options"
                  value='optionTwo'
                  onClick={this.handleClick}
                />
                {question.optionTwo.text}
              </li>
            </ul>
            <button className='btn'>Submit</button>
          </form>
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

export default connect(mapStateToProps)(Question)