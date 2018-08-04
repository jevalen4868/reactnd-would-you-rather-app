import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionUnanswered from "./QuestionUnanswered";
import QuestionAnswered from "./QuestionAnswered";
import { Redirect } from "react-router-dom";

class QuestionPage extends Component {
  render() {
    const { authedUser, question } = this.props
    return (
      <Fragment>
        {
          question === undefined
            ?
            <Redirect to='/404' />
            :
            question.optionOneText.votes.includes(authedUser)
            || question.optionTwoText.votes.includes(authedUser)
              ? <QuestionAnswered id={question.id}/>
              : <QuestionUnanswered qid={question.id}/>
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