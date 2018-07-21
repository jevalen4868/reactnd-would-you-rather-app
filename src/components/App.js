import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import { handleLoginData } from '../actions/login'

import Nav from './Nav'
import Login from './Login'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'

import './App.css';
import Question from "./Question";

class App extends Component {

  componentDidMount() {
    const { authenticated, dispatch } = this.props
    !authenticated && dispatch(handleLoginData())
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
              :
              <div>
                <Question
                  id='6ni6ok3ym7mf1p33lnez'
                />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authenticated: authedUser !== null,
})

export default connect(mapStateToProps)(App);
