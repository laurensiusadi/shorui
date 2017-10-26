import * as rx from './rxdb.js'

let get = async _ => {
  return rx.get()
}

let demoDocuments = async _ => {
  const database = await rx.get()
  database.documents.find().exec().then((documents) => {
    if (documents.length === 0) {
      var one = {
        title: 'About Cats',
        created: new Date(2017, 9, 8, 9, 30, 0).toISOString(),
        updated: new Date().toISOString(),
        tags: ['Inbox', 'Fun'],
        body: '# Cats\n\n the furry little guys are the best',
        order: 0,
        fixed: true
      }
      var two = {
        title: 'Markdown Cheatsheet',
        created: new Date(2017, 9, 9, 9, 30, 0).toISOString(),
        updated: new Date().toISOString(),
        tags: ['Examples', 'Business'],
        body: '# Header\n\n## Header\n\n#### Header\n\n*testing*\n\n**test**',
        order: 1,
        fixed: false
      }
      database.documents.insert(one)
      database.documents.insert(two)
    } else {

    }
  })
}

export {
  demoDocuments,
  get
}
