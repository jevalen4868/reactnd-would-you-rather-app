import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from "./User";

class Leaderboard extends Component {
  render() {
    const { userIds } = this.props
    return (
      <div className='leaderboard'>
        <h3 className='center'>Leaderboard</h3>
        <ul className='leaderboard-list'>
          {
            userIds.map((userId) => (
              <li key={userId}>
                <User id={userId}/>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  const userScores = {}
  Object.keys(users).forEach((userId) => {
    const { answers, questions } = users[userId]
    const answered = Object.keys(answers).length
    const asked = questions.length
    userScores[userId] = {
      id: userId,
      score: [answered + asked],
    }
  })

  return {
    userIds: Object.keys(userScores)
      .sort((a, b) => userScores[b].score - userScores[a].score)
  }
}

export default connect(mapStateToProps)(Leaderboard)