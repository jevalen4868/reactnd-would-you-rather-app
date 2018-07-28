import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Question from "./Question";
import QuestionDetail from "./QuestionDetail";

class QuestionPage extends Component {
  render() {
    const { authedUser, question } = this.props
    return (
      <Fragment>
        {
          question.optionOne.votes.includes(authedUser)
          || question.optionTwo.votes.includes(authedUser)
            ? <QuestionDetail id={question.id}/>
            : <Question id={question.id}/>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser, questions }, { match }) => {
  return {
    question: questions[match.params.id],
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionPage)