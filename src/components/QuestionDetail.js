import React, { Component } from 'react'
import { connect } from 'react-redux'

/*
Controlled component, to manage the radio button selected.
 */
class QuestionDetail extends Component {

  render() {
    const { question, authedUser, askedByUser, numUsers } = this.props
    const questionOnePercentile = question.optionOne.votes.length > 0
      ? (question.optionOne.votes.length / numUsers * 100).toFixed(0)
      : 0
    const questionOnePercentileStyle = { width: `${questionOnePercentile}%` };
    const questionTwoPercentile = question.optionTwo.votes.length > 0
      ? (question.optionTwo.votes.length / numUsers * 100).toFixed(0)
      : 0
    const questionTwoPercentileStyle = { width: `${questionTwoPercentile}%` };

    return (
      <div className='question'>
        <div className='question-user-info'>
          <h4>
            {question.author === authedUser
              ? 'You ask'
              : `${askedByUser.name} asks`}</h4>

          <img
            src={askedByUser.avatarURL}
            alt={`Avatar of ${askedByUser.name}`}
            className='avatar'
          />
        </div>

        <div className='question-info'>
          <h4>
            Results
          </h4>

          <div className='question-option'>
            {
              question.optionOne.votes.includes(authedUser) &&
              <span className='question-voted-user'>
               You voted.
              </span>
            }

            <div>
              <p className='question-option-text'>
                {question.optionOne.text}
              </p>
            </div>

            <div className='question-progress-bar'>
              <div
                className='question-progress-bar-fill'
                style={questionOnePercentileStyle}
              >
                <span className='question-percentile'>
                  {questionOnePercentile}%
                </span>
              </div>
            </div>

            <span className='question-total-votes'>
              {`${question.optionOne.votes.length} out of ${numUsers} votes.`}
            </span>

          </div>

          <br/>

          <div className='question-option'>
            {
              question.optionTwo.votes.includes(authedUser) &&
              <span className='question-voted-user'>
               You voted.
              </span>
            }

            <div>
              <p className='question-option-text'>
                {question.optionTwo.text}
              </p>
            </div>

            <div className='question-progress-bar'>
              <div
                className='question-progress-bar-fill'
                style={questionTwoPercentileStyle}
              >
                <span className='question-percentile'>
                  {questionTwoPercentile}%
                </span>
              </div>
            </div>

            <span className='question-total-votes'>
              {`${question.optionTwo.votes.length} out of ${numUsers} votes.`}
            </span>

          </div>

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
    numUsers: Object.keys(users).length
  }
}

export default connect(mapStateToProps)(QuestionDetail)