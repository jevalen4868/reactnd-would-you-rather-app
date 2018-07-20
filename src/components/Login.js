import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {

  handleChange = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const id = e.target.value
    if (id !== '') {
      dispatch(setAuthedUser(id))
    } else {
      // Do nothin'
      console.log('User selected empty user... doh.')
    }
  }

  render() {
    const { userIds, loading } = this.props
    return (
      <div>
        {
          !loading &&
          <select onChange={this.handleChange}>
            <option value=''/>
            {
              userIds.map((userId) => (
                <option key={userId}>{userId}</option>
              ))
            }
          </select>
        }
      </div>
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