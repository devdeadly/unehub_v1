import React, { Component } from 'react'

class Navbar extends Component {
  state = {
    profiles: [],
    showModal: false,
  }

  render() {
    return (
      <>
        {this.state.showModal && (
          <div
            className='fixed inset-0 z-50 overflow-auto bg-smoke_light flex items-center'
            onClick={() => this.setState({ showModal: !this.state.showModal })}
          >
            <div className='bg-white mx-10 p-5 rounded shadow-lg'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
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
                <title>Menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
          <div className='w-full block flex-grow lg:flex lg:w-auto'>
            <div className='p-4 hover:bg-gray-200 hover:text-blue-500 lg:flex lg:justify-center lg:items-center lg:text-center'>
              <a
                href='#responsive-header'
                className='block mt-4 lg:inline-block lg:mt-0 '
              >
                Riders
              </a>
            </div>
            <div className='lg:flex-grow'></div>
            <div className='flex'>
              <button
                className='lg:self-center bg-custom_green rounded px-2 py-1 text-white mt-4 mx-2 lg:mt-0'
                onClick={() =>
                  this.setState({ showModal: !this.state.showModal })
                }
              >
                Sign up
              </button>
              <button className='lg:self-center bg-gray-200 text-gray-700 rounded px-2 py-1 text-white mt-4 mx-2 lg:mt-0'>
                Log in
              </button>
            </div>
          </div>
        </nav>
      </>
    )
  }
}
export default Navbar
