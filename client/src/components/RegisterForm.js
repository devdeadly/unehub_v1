import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { email, passwordsMustMatch, required } from '../utils/validators'
// import { setAlert } from '../actions/alert'
import { registerUser } from '../actions/auth'

class RegisterForm extends Component {
  submit = ({ name, email, password }) => {
    this.props.registerUser({ name, email, password })
  }

  renderField = ({
    input,
    label,
    type,
    autoFocus = false,
    meta: { touched, error },
  }) => {
    return (
      <div className='mb-2'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          {label}
        </label>
        <input
          {...input}
          type={type}
          autoFocus={autoFocus}
          className={`${touched && error && 'border-red-500'} 
              shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline`}
        />
        {touched && error && <p className='invalid-field'>{error}</p>}
      </div>
    )
  }

  render() {
    const { handleSubmit, invalid, submitting, handleClose } = this.props

    return (
      <div className='fixed inset-0 z-50 overflow-auto bg-smoke_light flex items-center justify-center animated fadeIn faster'>
        <div className='max-w-sm'>
          <form
            className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            onSubmit={handleSubmit(this.submit)}
          >
            <div className='flex justify-end items-center'>
              <i
                className='fas fa-times cursor-pointer'
                onClick={handleClose}
              ></i>
            </div>
            <Field
              name='name'
              type='text'
              label='name'
              autoFocus={true}
              validate={[required]}
              component={this.renderField}
            />
            <Field
              name='email'
              type='email'
              label='email'
              validate={[required, email]}
              component={this.renderField}
            />
            <Field
              name='password'
              type='password'
              label='password'
              validate={[required]}
              component={this.renderField}
            />
            <Field
              name='password2'
              type='password'
              label='confirm password'
              validate={[required, passwordsMustMatch]}
              component={this.renderField}
            />
            <button
              className={`${(invalid || submitting) && 'disabled-button'} 
            shadow text-white font-bold my-2 py-2 px-4 rounded bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none`}
            >
              register
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const connectedRegisterForm = connect(
  null,
  { alert, registerUser }
)(RegisterForm)
const createReduxForm = reduxForm({
  form: 'register', // a unique identifier for this form
})
export default createReduxForm(connectedRegisterForm)
