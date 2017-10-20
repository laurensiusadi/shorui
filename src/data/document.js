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
    'description': {
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
    'project': {
      'type': 'string',
      'encrypted': true
    }
  }
}

export default document
