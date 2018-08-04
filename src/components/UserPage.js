import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import User from "./User";
import { Redirect } from "react-router-dom";

class UserPage extends Component {
  render() {
    const { userId, name, shouldRender } = this.props
    if (name === undefined) {
      return <Redirect to='/404'/>
    }
    return (
      <Fragment>
        {
          shouldRender &&
          <div>
            <h3 className='center'>{name}</h3>
            <User id={userId}/>
          </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser, users }, { match }) => {
  // In case the user clicked on themselves.
  const shouldRender = authedUser !== match.params.userId
  // Otherwise
  const userId = match.params.userId || authedUser
  // Double check for user label.
  const isCurrentUser = authedUser === userId

  return {
    name: isCurrentUser
      ? 'You'
      : users[userId] && users[userId].name,
    userId,
    shouldRender
  }
}
export default connect(mapStateToProps)(UserPage)