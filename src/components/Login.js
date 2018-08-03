import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";
import { handleAddUser } from "../actions/users";
import NewUser from "./NewUser";

class Login extends Component {

  state = {
    'createNewUser': false
  }

  handleChange = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const id = e.target.value
    if (id !== '') {
      dispatch(handleInitialData(id))
    } else {
      // Do nothin'
      console.log('User selected empty user... doh.')
    }
  }

  toggleCreateNewUser = (e = null) => {
    e && e.preventDefault()
    this.setState((prevState) => ({
      'createNewUser': !prevState['createNewUser']
    }))
  }

  onCreateNewUserSubmit = (user) => {
    const { dispatch } = this.props
    this.toggleCreateNewUser()
    dispatch(handleAddUser(user))
  }

  render() {
    const { userIds, loading } = this.props
    const { createNewUser } = this.state
    return (
      <Fragment>
        {
          !loading &&
          <div className='login'>
            <h1>WYR</h1>
            <h3>Login, s'il vous plait.</h3>
            <select
              className='login-select'
              onChange={this.handleChange}
              disabled={createNewUser === true}>
              <option value=''/>
              {
                userIds.map((userId) => (
                  <option key={userId}>{userId}</option>
                ))
              }
            </select>
            <div className='create-new-user'>
              <button
                className='btn'
                onClick={this.toggleCreateNewUser}>
                create new user
              </button>
            </div>
            {
              createNewUser &&
              <NewUser
                handleCreateNewUserSubmit={this.onCreateNewUserSubmit}
              />

            }
          </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ users, loadingBar }) => ({
  userIds: Object.keys(users)
    .sort((a, b) => users[b].id - users[a].id),
  // Use this guy as a truthy indicator!! Handy
  loading: loadingBar.default
})

export default connect(mapStateToProps)(Login)