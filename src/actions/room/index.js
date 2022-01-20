const joinRoom = wrapWithErrorHandler(require('./join.js'))

const { handleError } = require('./helpers.js')

function wrapWithErrorHandler(fn) {
  return async (req, res) => {
    try {
      await fn(req, res)
    } catch (err) {
      const { code, status } = handleError(err)
      res.code(code).send(status)
    }
  }
}

module.exports = {
  joinRoom,
  
}
