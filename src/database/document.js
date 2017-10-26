const document = {
  'title': 'Document Schema',
  'version': 0,
  'description': 'Schema for Shorui documents.',
  'type': 'object',
  'properties': {
    'title': {
      'type': 'string',
      'encrypted': true
    },
    'created': {
      'type': 'string',
      'primary': true
    },
    'updated': {
      'type': 'string'
    },
    'body': {
      'type': 'string',
      'encrypted': true
    },
    'tags': {
      'type': 'array',
      'item': {
        'type': 'string'
      }
    },
    'order': {
      'type': 'number'
    },
    'fixed': {
      'type': 'boolean'
    }
  }
}

export default document
