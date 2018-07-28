import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

/*
Controlled component.
 */
class NewQuestion extends Component {

  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    this.setState((prevState) => ({
      [name]: value,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    console.log('submitted!', optionOne, optionTwo)
  }

  render() {
    const { optionOne, optionTwo } = this.state
    return (
      <Fragment>
        <h3 className='center'>New Question</h3>
        <div className='new-question'>
          <h3 className='center'>Would you rather...</h3>
          <form id='new-question-form' onSubmit={this.handleSubmit}>
            <input
              name='optionOne'
              placeholder='Option One'
              value={optionOne}
              onChange={this.handleChange}
              className='option'
              maxLength={280}
            />
            <p>OR</p>
            <input
              name='optionTwo'
              placeholder='Option Two'
              value={optionTwo}
              onChange={this.handleChange}
              className='option'
              maxLength={280}
            />
            <button
              className='btn'
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}
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