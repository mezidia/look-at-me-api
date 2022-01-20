const schema = {
  description: 'Check is system works',
  tags: ['Health Check'],
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      },
      required: ['status']
    }
  }
}

module.exports = schema
