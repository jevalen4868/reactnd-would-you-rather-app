import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLoginData } from '../actions/login'
//import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Login from './Login'
import './App.css';

class App extends Component {

  componentDidMount() {
    const {authenticated, dispatch} = this.props
    !authenticated && dispatch(handleLoginData())
//    authenticated && dispatch(handleInitialData())
  }

  render() {
    const { authenticated } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className="container">
            <Nav/>
            {!authenticated
              ? // login
              <Login/>
              : // already logged in.
              <div>
                You are authenticated!
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authenticated: authedUser !== null
})

export default connect(mapStateToProps)(App);
