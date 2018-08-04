import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { handleLoginData } from '../actions/login'

import Nav from './Nav'
import Login from './Login'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Leaderboard from "./Leaderboard";
import AddQuestion from "./AddQuestion";
import QuestionPage from "./QuestionPage";
import UserPage from "./UserPage";
import { NotFound } from "./NotFound";

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
            {!authenticated
              ? // login
                <Route component={Login}/>
              :
              <div>
                <Nav/>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/question/:id' component={QuestionPage}/>
                <Route path='/add' component={AddQuestion}/>
                <Route path='/leaderboard' component={Leaderboard}/>
                <Route path='/user/' component={UserPage}/>
                <Route path='/user/:userId' component={UserPage}/>
                <Route path='/404' component={NotFound} status={404} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
  authenticated: authedUser !== null,
  users,
  questions
})

export default connect(mapStateToProps)(App);
