import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import stringer from 'underscore.string'
import * as db from '../../database/db.js'

_.mixin(stringer.exports())

Vue.use(Vuex)

var subs = []

const state = {
  doc: {},
  selectedDocument: '',
  previewRequested: false,
  caret: { start: 0, end: 0 },
  findIndex: 0,
  documentList: []
}

const mutations = {
  setDocument (state, doc) {
    state.doc = doc
  },
  deleteDocument (state) {
    state.doc.remove()
    state.doc = {}
    state.selectedDocument = ''
    state.caret = { start: 0, end: 0 }
  },
  pinDocument (state) {
    state.doc.fixed = !state.doc.fixed
    state.doc.save()
  },
  setDocumentTitle (state, value) {
    state.doc.title = value
    state.doc.save()
  },
  saveDocument ({ state }) {
    state.doc.set('updated', new Date().toISOString())
    state.doc.save()
    state.previewRequested = true
  },
  setDocumentList (state, value) {
    state.documentList = value
  },
  setSelectedDocument (state, value) {
    state.selectedDocument = value
  },
  setPreviewRequested (state, value) {
    state.previewRequested = value
  },
  setBody (state, value) {
    state.doc.set('body', value)
    // state.doc.save()
  },
  insertBody (state, value) {
    state.doc.set('body', _.insert(state.doc.body, state.caret.start, value))
    // state.doc.save()
  },
  surroundBody (state, value) {
    state.doc.set('body', _.insert(state.doc.body, state.caret.end, value))
    state.doc.set('body', _.insert(state.doc.body, state.caret.start, value))
    // state.doc.save()
  },
  setCaret (state, value) {
    state.caret = value
  },
  setFindIndex (state, value) {
    state.findIndex = value
  },
  replaceAllInBody (state, payload) {
    state.doc.set('body', _.replaceAll(state.doc.body, payload.target, payload.value))
  },
  replaceSelection (state, payload) {
    state.doc.set('body', _.splice(state.doc.body, state.caret.start, state.caret.end - state.caret.start, payload.value))
  },
  alter (state, type) {
    var sub = state.doc.body.substring(state.caret.start, state.caret.end)

    switch (type) {
      case 'capitalize':
        sub = _.capitalize(sub, false)
        break
      case 'clean':
        sub = _.clean(sub)
        break
      case 'strip':
        sub = _.stripTags(sub)
        break
      case 'titleize':
        sub = _.titleize(sub)
        break
      case 'join-lines':
        sub = _.lines(sub)
        sub = sub.join(' ')
        break
      default:
        break
    }

    state.doc.set('body', _.splice(state.doc.body, state.caret.start, state.caret.end - state.caret.start, sub))
    // state.doc.save()
  },
  async updateDocumentList ({ state }, docs) {
    var database = await db.get()
    // state.documentList = value
    for (var i in docs) {
      database.documents
        .findOne()
        .where('created')
        .eq(docs[i].created)
        .exec()
        .then(doc => {
          doc.set('order', docs[i].order)
          doc.save()
        })
    }
    // actions.loadProjects()
  },
  insertion (state, type) {
    var value = ''

    switch (type) {
      case 'toc':
        value = '@[toc]'
        break
      case 'table':
        value = '| Header | HEader | HEADER |\n|------------- |:-------------:| -----:|\n| one | two | three |\n'
        break
      case 'url':
        value = '[link](http//google.com)'
        break
      case 'image':
        value = '![alt text](IMG URL HERE)'
        break
      case 'list':
        value = '\n* \n* \n* \n'
        break
      case 'deflist':
        value = 'Term 1\n: Definition 1\nTerm 2 with *inline markup*\n: Definition 2\n'
        break
      case 'tasklist':
        value = '- [ ] unchecked item 1\n- [ ] unchecked item 2\n- [ ] unchecked item 3\n- [x] checked item 4\n'
        break
      case 'texmath':
        /* eslint-disable */
        value = 'Euler\'s identity $e^{i\pi}+1=0$ is a beautiful formula.'
        /* eslint-enable */
        break
      default:
        break
    }

    state.doc.set('body', _.insert(state.doc.body, state.caret.start, value))
    // state.doc.save()
  }
}

const actions = {
  async loadDocument ({ commit, state }) {
    var database = await db.get()
    database.documents
      .findOne()
      .where('created')
      .eq(state.selectedDocument)
      .exec()
      .then(result => {
        // state.doc = result
        // this.projectSelection = result.project
        // this.setPreviewRequested(true)
        // this.$localStorage.set('lastDocument', this.selectedDocument)
        commit('setDocument', result)
        commit('setSelectedDocument', result.created)
        commit('setPreviewRequested', true)
      })
  },
  async newDocument ({ commit, state }) {
    var database = await db.get()
    var newDocument = {
      title: 'Untitled',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      tags: [''],
      order: 0,
      fixed: false,
      body: ''
    }
    database.documents.insert(newDocument)
  },
  async loadProjects (context) {
    var database = await db.get()
    subs.push(
      database.documents
        .find()
        .$
        .filter(x => {
          return x != null
        })
        .subscribe(results => {
          let documents = _.flatMap(results, function (doc) {
            return { 'tags': doc.get('tags'), 'fixed': doc.get('fixed'), 'order': doc.get('order'), 'created': doc.get('created'), 'updated': doc.get('updated'), 'title': doc.get('title') }
          })
          documents = _.orderBy(documents, ['fixed', 'updated'], ['desc', 'desc'])
          context.commit('setDocumentList', documents)
        })
    )
  },
  unsub () {
    subs.forEach(document => document.unsubscribe())
  }
}

const getters = {
  selectedDocument: state => {
    return state.selectedDocument
  },
  previewRequested: state => state.previewRequested,
  getCaret: state => state.caret,
  getBody: state => state.doc ? state.doc.body : '',
  // getCount: state => state.doc.body.length,
  // getUpdated: state => state.doc.body.updated,
  findIndex: state => state.findIndex,
  documentList: state => state.documentList,
  findCount: (state, getters) => (query) => {
    return _.count(state.doc.body, query)
  },
  isPinned: state => state.doc.fixed,
  getDocumentTitle: state => state.doc.title
}

export default { state, mutations, getters, actions }
