const schema = {
  description: 'Join room',
  tags: ['Room'],
  params: {
    type: 'object',
    id: { type: 'string', minLen: 1 },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      },
    }
  }
}

module.exports = schema
