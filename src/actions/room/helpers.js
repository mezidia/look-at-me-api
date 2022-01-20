const handleError = err => {
  let res = { code: 500, status: 'Internal server error' }
  if (err instanceof sequelize.ValidationError) {
    res = { code: 400, status: err.message }
  }
  return res
}

module.exports = {
  handleError
}
