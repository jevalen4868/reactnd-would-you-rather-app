import React, { Component } from 'react'
import ImageInput from "./ImageInput"
import { connect } from 'react-redux'
import serializeForm from 'form-serialize';

class NewUser extends Component {

  state = {
    id: '',
    name: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState((prevState) => ({
      [name]: value,
    }))
  }

  onSubmit = (e) => {
    e.preventDefault()
    const formValues = serializeForm(e.target, { hash: true })
    this.props.handleCreateNewUserSubmit(formValues)
  }

  render() {
    const { id, name } = this.state
    return (
      <form
        className='create-new-user-form'
        onSubmit={this.onSubmit}
      >
        <ImageInput
          className='create-user-avatar-input'
          name='avatarURL'
          maxHeight={64}
        />
        <div
          className='create-user-details'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={this.handleChange}
            autoComplete='off'
          />
          <input
            type='text'
            name='id'
            placeholder='Id'
            value={id}
            onChange={this.handleChange}
            autoComplete='off'
          />
          <button
            className='btn'
            disabled={
              id === ''
              || name === ''
            }
          >
            Add User
          </button>
        </div>
      </form>
    )
  }
}

export default connect()(NewUser)