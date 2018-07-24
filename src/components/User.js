import React, { Component } from 'react'
import { connect } from 'react-redux'

/*
johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/dan.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
 */

class User extends Component {
  render() {
    const { user } = this.props

    if (user === null) {
      return <p>This user does not exist!</p>
    }

    const { name, avatarURL, answers, questions } = user
    const answered = Object.keys(answers).length
    const asked = questions.length

    return (
      <div className='user'>
        <div className='user-img'>
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
        </div>
        <div className='user-stats'>
          <h4>{name}</h4>
          <p>Answered: {answered}</p>
          <p>Asked: {asked}</p>
        </div>
        <div className='user-score'>
          <h4>Score</h4>
          <span className='user-score-text'>{asked + answered}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users }, { id }) => ({
  user: users[id]
    ? users[id]
    : null
})

export default connect(mapStateToProps)(User)