const getEnv = () => {
  if (process.env.NODE_ENV === 'development') return ''
  console.log(`__${process.env.NODE_ENV.toUpperCase()}`)
  return `__${process.env.NODE_ENV.toUpperCase()}`
}

module.exports = getEnv
