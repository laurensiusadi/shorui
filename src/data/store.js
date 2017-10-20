import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import stringer from 'underscore.string'

_.mixin(stringer.exports())

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDocument: '',
    previewRequested: false,
    body: '',
    updated: '',
    caret: {start: 0, end: 0},
    findIndex: 0,
    projectList: []
  },
  mutations: {
    setSelectedDocument (state, value) {
      state.selectedDocument = value
    },
    setPreviewRequested (state, value) {
      state.previewRequested = value
    },
    setBody (state, value) {
      state.body = value
    },
    insertBody (state, value) {
      state.body = _.insert(state.body, state.caret.start, value)
    },
    surroundBody (state, value) {
      state.body = _.insert(state.body, state.caret.end, value)
      state.body = _.insert(state.body, state.caret.start, value)
    },
    setUpdated (state, value) {
      state.updated = value
    },
    setCaret (state, value) {
      state.caret = value
    },
    setProjectList (state, value) {
      state.projectList = value
    },
    setFindIndex (state, value) {
      state.findIndex = value
    },
    replaceAllInBody (state, payload) {
      state.body = _.replaceAll(state.body, payload.target, payload.value)
    },
    replaceSelection (state, payload) {
      state.body = _.splice(state.body, state.caret.start, state.caret.end - state.caret.start, payload.value)
    },
    alter (state, type) {
      var sub = state.body.substring(state.caret.start, state.caret.end)

      switch (type) {
        case 'capitalize':
          sub = _.capitalize(sub)
          break
        case 'decapitalize':
          sub = _.decapitalize(sub)
          break
        case 'clean':
          sub = _.clean(sub)
          break
        case 'strip':
          sub = _.stripTags(sub)
          break
        default:
          break
      }

      state.body = _.splice(state.body, state.caret.start, state.caret.end - state.caret.start, sub)
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
        default:
          break
      }

      state.body = _.insert(state.body, state.caret.start, value)
    }
  },
  getters: {
    selectedDocument: state => state.selectedDocument,
    previewRequested: state => state.previewRequested,
    getBody: state => state.body,
    getCaret: state => state.caret,
    getCount: state => state.body.length,
    getUpdated: state => state.updated,
    findIndex: state => state.findIndex,
    projectList: state => state.projectList,
    findCount: (state, getters) => (query) => {
      return _.count(state.body, query)
    }
  }
})
