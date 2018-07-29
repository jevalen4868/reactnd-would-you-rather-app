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
          question.optionOneText.votes.includes(authedUser)
          || question.optionTwoText.votes.includes(authedUser)
            ? <QuestionDetail id={question.id}/>
            : <Question qid={question.id}/>
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