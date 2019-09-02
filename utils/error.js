const genError = (...args) => {
  return {
    errors: args.map(arg => ({
      msg: arg,
    })),
  }
}

const handleServerError = (error, res) => {
  console.error(error)
  res
    .status(500)
    .send(
      genError(
        'An unexpected error occured on the server. Please try again later.'
      )
    )
}

module.exports = {
  genError,
  handleServerError,
}
