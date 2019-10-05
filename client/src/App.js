import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'

class App extends Component {
  state = {
    profiles: [],
    showModal: false,
  }
  async componentDidMount() {
    const response = await axios.get('http://localhost/api/profile')
    console.log(response.data)
    this.setState({ profiles: response.data })
  }

  render() {
    return (
      <div className='App font-sans'>
        <Navbar />
        <main className='px-4'>
          {this.state.profiles.map(profile => (
            <div className='max-w-sm bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-all transition-100 m-100'>
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
                {profile.disciplines.map(discipline => (
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                    #{discipline}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* <pre className='bg-purple-300 my-4 p-6 rounded shadow-lg hover:bg-indigo-300 transition-all transition-2000'>
            {JSON.stringify(this.state.profiles, null, 2)}
          </pre> */}
        </main>
      </div>
    )
  }
}

export default App
