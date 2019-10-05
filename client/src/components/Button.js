import React from 'react'

const Button = props => {
  return (
    <button
      className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
      type='button'
      //   onClick={() => this.setState({ showModal: !this.state.showModal })}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  )
}

export default Button
