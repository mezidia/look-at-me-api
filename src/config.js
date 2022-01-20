const isProd = process.env.NODE_ENV === 'production'

const appConfig = {
  logger: isProd ? { level: 'warn' } : { level: 'info', prettyPrint: true }
}

module.exports = {
  isProd,
  appConfig
}
