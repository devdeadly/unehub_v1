import React, { Component } from 'react'
import { connect } from 'react-redux'
import validator from 'validator'

// import { setAlert } from '../actions/alert'
import { loginUser } from '../actions/auth'
import Button from './Button'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    validForm: false,
    validEmail: true,
    invalidEmailReason: '',
    validPassword: true,
    invalidPasswordReason: '',
  }

  handleChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value,
      },
      this.validateForm
    )
  }

  validateForm = () => {
    const { validEmail, validPassword } = this.state
    this.setState({ validForm: validEmail && validPassword })
  }

  validateEmail = () => {
    const { email } = this.state
    this.setState({
      validEmail: validator.isEmail(email),
      invalidEmailReason: !validator.isEmail(email) && 'invalid email',
    })

    this.validateForm()
  }

  validatePassword = () => {
    const { password } = this.state
    this.setState({
      validPassword: password.length >= 6,
      invalidPasswordReason: 'password must be 6 or more characters',
    })
    this.validateForm()
  }

  logState = () => {
    console.log(this.state)
  }

  login = () => {
    console.log('login')
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password,
    })
  }

  render() {
    const {
      validForm,
      validEmail,
      invalidEmailReason,
      validPassword,
      invalidPasswordReason,
    } = this.state
    return (
      <div className='fixed inset-0 z-50 overflow-auto bg-smoke_light flex items-center justify-center'>
        <div className='max-w-sm'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='flex justify-end items-center'>
              <i
                className='fas fa-times text-red-600 cursor-pointer '
                onClick={this.props.handleClick}
              ></i>
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                for='email'
              >
                email
              </label>
              <input
                className={`shadow appearance-none border ${!validEmail &&
                  'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id='email'
                type='text'
                placeholder='danheaton@gmail.com'
                onChange={this.handleChange}
                onBlur={this.validateEmail}
              />
              {!validEmail && invalidEmailReason !== '' && (
                <p className='text-red-500 text-xs italic'>
                  {this.state.invalidEmailReason}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                for='password'
              >
                password
              </label>
              <input
                className={`shadow appearance-none border ${!validPassword &&
                  'border-red-500'} rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                id='password'
                type='password'
                placeholder='******'
                onChange={this.handleChange}
                onBlur={this.validatePassword}
              />
              {!validPassword && invalidPasswordReason !== '' && (
                <p className='text-red-500 text-xs italic'>
                  {this.state.invalidPasswordReason}
                </p>
              )}
            </div>
            <button
              className={`shadow bg-purple-500 ${!validForm &&
                'opacity-50 cursor-not-allowed'} hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
              type='button'
              onClick={this.login}
            >
              log in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   isAuthenticated: this.state.isAuthenticated,
// })

export default connect(
  null,
  { alert, loginUser }
)(LoginForm)
