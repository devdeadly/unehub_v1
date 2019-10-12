import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

class Navbar extends Component {
  state = {
    profiles: [],
    showRegisterForm: false,
    showLoginForm: false,
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.setState({
        showLoginForm: false,
        showRegisterForm: false,
      })
    }
  }

  toggleRegisterForm = () => {
    this.setState({ showRegisterForm: !this.state.showRegisterForm })
  }

  toggleLoginForm = () => {
    this.setState({ showLoginForm: !this.state.showLoginForm })
  }

  render() {
    return (
      <>
        {this.state.showRegisterForm && (
          <RegisterForm handleClose={this.toggleRegisterForm} />
        )}

        {this.state.showLoginForm && (
          <LoginForm handleClose={this.toggleLoginForm} />
        )}

        <nav className='flex items-center justify-between flex-wrap bg-white mb-4 text-gray-800 border-'>
          <div className='flex items-center flex-shrink-0 mx-3'>
            <span className='font-semibold text-2xl tracking-loose'>
              unehub
            </span>
          </div>
          <div className='block lg:hidden'>
            <button className='flex items-center px-3 py-2 border rounded text-xl border-custom_purple hover:border-white'>
              <svg
                className='fill-current h-3 w-3'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
          <div className='w-full block flex-grow lg:flex lg:w-auto'>
            <div className='p-4 hover:bg-gray-200 hover:text-blue-500 lg:flex lg:justify-center lg:items-center lg:text-center'>
              <button className='block mt-4 lg:inline-block lg:mt-0 '>
                riders
              </button>
            </div>
            <div className='lg:flex-grow'></div>
            <div className='flex'>
              <button
                className='lg:self-center bg-purple-500 font-bold rounded px-2 py-1 text-white mt-4 lg:mt-0 hover:shadow-md transition-all transition-100'
                onClick={this.toggleRegisterForm}
              >
                register
              </button>
              {this.props.isAuthenticated ? (
                <button
                  className='lg:self-center bg-gray-200 font-bold text-gray-700 rounded px-2 py-1 text-white mt-4 mx-4 lg:mt-0  hover:shadow-md transition-all transition-100'
                  onClick={this.props.logout}
                >
                  logout
                </button>
              ) : (
                <button
                  className='lg:self-center bg-gray-200 font-bold text-gray-700 rounded px-2 py-1 text-white mt-4 mx-4 lg:mt-0  hover:shadow-md transition-all transition-100'
                  onClick={this.toggleLoginForm}
                >
                  log in
                </button>
              )}
            </div>
          </div>
        </nav>
      </>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
