import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from "../actions/shared";

/*
Controlled component.
 */
class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState((prevState) => ({
      [name]: value,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const { optionOneText, optionTwoText } = this.state
    dispatch(handleSaveQuestion(optionOneText, optionTwoText))

    // Think we can assume we didn't error out if we get here.
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
    }))
  }

  render() {
    const { optionOneText, optionTwoText } = this.state
    return (
      <Fragment>
        <h3 className='center'>New Question</h3>
        <div className='new-question'>
          <h3 className='center'>Would you rather...</h3>
          <form id='new-question-form' onSubmit={this.handleSubmit}>
            <input
              name='optionOneText'
              placeholder='Option One'
              value={optionOneText}
              onChange={this.handleChange}
              className='option'
              maxLength={280}
            />
            <p>OR</p>
            <input
              name='optionTwoText'
              placeholder='Option Two'
              value={optionTwoText}
              onChange={this.handleChange}
              className='option'
              maxLength={280}
            />
            <button
              className='btn'
              type='submit'
              disabled={optionOneText === '' || optionTwoText === ''}
            >
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default connect()(NewQuestion)