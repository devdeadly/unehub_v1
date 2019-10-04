import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'

class App extends Component {
  state = {
    profiles: [],
  }
  async componentDidMount() {
    const response = await axios.get('http://localhost/api/profile')
    console.log(response.data)
    this.setState({ profiles: response.data })
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div class='max-w-sm rounded overflow-hidden shadow-lg'>
          <img
            class='w-full'
            src='https://images.unsplash.com/photo-1569834381156-7b735e41e57d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80'
            alt='Sunset in the mountains'
          />
          <div class='px-6 py-4'>
            <div class='font-bold text-xl mb-2'>The Coldest Sunset</div>
            <p class='text-gray-700 text-base'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class='px-6 py-4'>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
              #photography
            </span>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
              #travel
            </span>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500'>
              #winter
            </span>
          </div>
        </div>
        <pre className='bg-purple-300 m-6 p-6 rounded shadow-lg'>
          {JSON.stringify(this.state.profiles, null, 2)}
        </pre>
      </div>
    )
  }
}

export default App
