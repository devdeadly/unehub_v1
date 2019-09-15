const mongoose = require('mongoose')

const connect = async uri => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log(
      `Successfully connected to${
        process.env.NODE_ENV === 'test' ? ' test instance of ' : ' '
      }MongoDB\n`.magenta.bold
    )
  } catch (error) {
    console.error(error.message)
    // exit process with failure (stop app)
    process.exit(1)
  }
}

const disconnect = async () => {
  try {
    await mongoose.disconnect()
    console.log(
      `Closed connection to${
        process.env.NODE_ENV === 'test' ? ' test instance of ' : ' '
      }MongoDB\n`.magenta.bold
    )
  } catch (error) {
    console.error(error.message)
    // exit process with failure (stop app)
    process.exit(1)
  }
}

module.exports = {
  connect,
  disconnect,
}
