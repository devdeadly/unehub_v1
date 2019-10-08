const mongoose = require('mongoose')

const MONGO_DB_OPTIONS = {
  reconnectInterval: 5000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

const connect = async uri => {
  await mongoose
    .connect(uri, MONGO_DB_OPTIONS)
    .then(() => console.log(`MongoDB ↑\n`.magenta.bold))
    .catch(() => {
      console.log('Failed to connect to MongoDB'.red.bold)
      process.exit(1)
    })
    .finally(() => {
      return
    })
}

const disconnect = async () => {
  try {
    await mongoose.disconnect()
    console.log(`MongoDB ↓\n`.magenta.bold)
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
