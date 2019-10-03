import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import './App.scss'
import './scss/app.scss'

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
        <pre>{JSON.stringify(this.state.profiles, null, 2)}</pre>
      </div>
    )
  }
}

export default App
