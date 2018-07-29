import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import User from "./User";

class UserPage extends Component {
  render() {
    const { authedUser } = this.props
    return (
      <Fragment>
        <h3 className='center'>You</h3>
        <User id={authedUser}/>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
})
export default connect(mapStateToProps)(UserPage)