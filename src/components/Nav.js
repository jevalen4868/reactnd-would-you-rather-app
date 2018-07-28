import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  render() {
    const { dispatch, history, username } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/user' activeClassName='active'>
              Bonjour {username}
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/logout'
              activeClassName='active'
              onClick={(e) => {
                e.preventDefault()
                // set authed user to empty
                history.push('/')
                dispatch(setAuthedUser(null))
              }}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
  username: users[authedUser].name,
  authedUser
})

// Adding withRouter fixes issue where activeClassName wasn't updating.
export default withRouter(connect(mapStateToProps)(Nav))

