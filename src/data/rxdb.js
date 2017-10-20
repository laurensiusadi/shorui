import 'babel-polyfill'
import * as RxDB from 'RxDB'
RxDB.plugin(require('pouchdb-adapter-websql'))
RxDB.QueryChangeDetector.enable()

const collections = [
  {
    name: 'documents',
    schema: require('./document.js').default
  }
]

let dbPromise = null

const _create = async function () {
  const db = await RxDB.create({
    name: 'shorui',
    adapter: 'websql',
    password: 'JGkashjasdhsdasjdiuOHJGDFSIYDS2651',
    multiInstance: false,
    ingoreDuplicate: true
  })
  await Promise.all(collections.map(colData => db.collection(colData)))
  return db
}

export function get () {
  if (!dbPromise) {
    dbPromise = _create()
  }
  return dbPromise
}
