import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

// import { setAlert } from '../actions/alert'
import { loginUser } from '../actions/auth'

let LoginForm = ({
  handleSubmit,
  submitting,
  invalid,
  handleClick,
  loginUser,
}) => {
  const submit = values => {
    console.log('values', values)
    loginUser({
      email: values.email,
      password: values.password,
    })
  }

  const renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          {label}
        </label>

        <div>
          <input
            {...input}
            type={type}
            className={`${touched &&
              error &&
              'border-red-500'} shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline`}
          />

          {touched && error && <p className='invalid-field'>{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-smoke_light flex items-center justify-center'>
      <div className='max-w-sm z-100'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit(submit)}
        >
          <div className='flex justify-end items-center'>
            <i
              className='fas fa-times cursor-pointer '
              onClick={handleClick}
            ></i>
          </div>
          <Field
            name='email'
            type='email'
            label='email'
            component={renderField}
          />
          <Field
            name='password'
            label='password'
            component={renderField}
            type='password'
          />
          <button
            className={`${(invalid || submitting) && 'disabled-button'} 
              shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
            type='submit'
          >
            log in
          </button>
        </form>
      </div>
    </div>
  )
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'required'
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'invalid email'
  }

  if (!values.password) {
    errors.password = 'required'
  }

  return errors
}

const createReduxForm = reduxForm({
  form: 'login', // a unique identifier for this form
  validate, // validation function given to redux-form
})

LoginForm = createReduxForm(LoginForm)

export default connect(
  null,
  { alert, loginUser }
)(LoginForm)
