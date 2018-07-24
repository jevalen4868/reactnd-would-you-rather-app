import React, { Component } from 'react'
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
      <div className='new-question'>
        <form id='new-question-form' onSubmit={this.handleSubmit}>
          <h3 className='center'>New Question</h3>
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
    )
  }
}

export default connect()(NewQuestion)