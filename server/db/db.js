const mongoose = require('mongoose')

const MONGO_DB_OPTIONS = {
  reconnectInterval: 5000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

const connectWithRetry = async uri => {
  mongoose
    .connect(uri, MONGO_DB_OPTIONS)
    .then(() => {
      console.log(
        `Successfully connected to${
          process.env.NODE_ENV === 'test' ? ' test instance of ' : ' '
        }MongoDB\n`.magenta.bold
      )
    })
    .catch(() => {
      console.log(
        `Failed to connect to MongoDB, retrying in ${MONGO_DB_OPTIONS.reconnectInterval /
          1000} second(s)`.red.bold
      )
      setTimeout(
        () => connectWithRetry(uri),
        MONGO_DB_OPTIONS.reconnectInterval
      )
    })
  return
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
  connectWithRetry,
  disconnect,
}
