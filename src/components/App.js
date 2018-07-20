import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import { handleLoginData } from '../actions/login'

import Nav from './Nav'
import Login from './Login'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'

import './App.css';

class App extends Component {

  componentDidMount() {
    const { authenticated, dispatch } = this.props
    !authenticated && dispatch(handleLoginData())
  }

  render() {
    const { authenticated, loading } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className="container">
            <Nav/>
            {!authenticated
              ? // login
              <Login/>
              :
              <div>
                <Dashboard/>
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser, questions }) => ({
  authenticated: authedUser !== null,
})

export default connect(mapStateToProps)(App);
