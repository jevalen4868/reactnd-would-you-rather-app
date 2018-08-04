import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

class User extends Component {
  render() {
    const { user } = this.props
    const { id, name, avatarURL, answers, questions } = user
    const answered = Object.keys(answers).length
    const asked = questions.length

    return (
      <Fragment>

        <div className='user'>
          <div className='user-img'>
            <Link to={`/user/${id}`}>
              <img
                src={avatarURL}
                className='avatar'
                alt=''
              />
            </Link>
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
      </Fragment>
    )
  }
}

const mapStateToProps = ({ users }, { id }) => ({
  user: users[id]
    ? users[id]
    : null
})

export default connect(mapStateToProps)(User)