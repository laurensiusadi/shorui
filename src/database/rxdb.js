import 'babel-polyfill'
import * as RxDB from 'rxdb'
RxDB.plugin(require('pouchdb-adapter-idb'))
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
    adapter: 'idb',
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
