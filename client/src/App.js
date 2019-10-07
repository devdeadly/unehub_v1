import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Notify } from 'react-redux-notify'
import 'react-redux-notify/dist/ReactReduxNotify.css'

import Navbar from './components/Navbar'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/set-auth-token'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

class App extends Component {
  state = {
    profiles: [],
  }

  async componentDidMount() {
    this.props.loadUser()

    const response = await axios.get('http://localhost/api/profile')
    this.setState({ profiles: response.data })
  }

  render() {
    return (
      <div className='App font-sans'>
        <Navbar />
        <Notify />
        <main className='px-4'>
          <h1 className='text-2xl font-bold'>riders</h1>
          {this.state.profiles.map((profile, i) => (
            <div
              key={i}
              className='max-w-sm bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-all transition-100 m-100'
            >
              <img
                className='w-full'
                src={profile.user.avatar}
                alt='Sunset in the mountains'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>
                  {profile.user.name}
                </div>
                <p className='text-gray-700 text-base'>{profile.bio}</p>
              </div>
              <div className='px-6 py-4'>
                {profile.disciplines.map((discipline, i) => (
                  <span
                    key={i}
                    className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
                  >
                    #{discipline}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user.name,
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
