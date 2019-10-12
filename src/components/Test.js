import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  incrementAsync,
  decrementAsync,
  incrementCounter,
  decrementCounter,
} from '../actions/test.actions'

class Test extends Component {
  render() {
    const {
      incrementAsync,
      decrementAsync,
      incrementCounter,
      decrementCounter,
    } = this.props
    return (
      <>
        <button
          onClick={() => incrementCounter()}
          className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
        >
          increment
        </button>
        <button
          onClick={() => decrementCounter()}
          className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
        >
          decrement
        </button>
        <div>{this.props.data}</div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
})

const actions = {
  incrementAsync,
  decrementAsync,
  incrementCounter,
  decrementCounter,
}

export default connect(
  mapStateToProps,
  actions
)(Test)
