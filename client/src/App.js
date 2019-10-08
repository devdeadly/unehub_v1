import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Notify } from 'react-redux-notify'
import 'react-redux-notify/dist/ReactReduxNotify.css'

import Navbar from './components/Navbar'
import { loadRider } from './actions/auth'
import setAuthToken from './utils/set-auth-token'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

class App extends Component {
  state = {
    riders: [],
  }

  async componentDidMount() {
    this.props.loadRider()

    const response = await axios.get('http://localhost:8000/api/riders')
    this.setState({ riders: response.data })
  }

  render() {
    return (
      <div className='font-sans'>
        <Navbar />
        <Notify />
        <main className='px-4'>
          <h1 className='text-2xl font-bold'>riders</h1>
          {this.state.riders.map((rider, i) => (
            <div
              key={i}
              className='max-w-sm bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-all transition-100 m-100'
            >
              <img
                className='w-full'
                src={rider.avatar}
                alt='Sunset in the mountains'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{rider.name}</div>
                <div className='italic text-xs mb-2'>{rider.location}</div>
                <p className='text-gray-700 text-base'>{rider.bio}</p>
              </div>
              <div className='px-6 py-4'>
                {rider.disciplines.map((discipline, i) => (
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
  rider: state.auth.rider.name,
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
  loadRider: () => dispatch(loadRider()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
