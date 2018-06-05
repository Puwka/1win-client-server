import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        books: '',
        tableLength: 0
    },
    mutations: {
        'SET_BOOKS' (state, books) {
            state.books = books
        },
        'SET_LENGTH' (state, data) {
            state.tableLength = data
        }
    },
    actions: {
        setBooks ({ commit }, data) {
            commit('SET_BOOKS', data)
        },
        setLength({ commit }, data) {
            commit('SET_LENGTH', data)
        }
    },
    getters: {
        books (state) {
            return state.books
        },
        tableLength (state) {
            return state.tableLength
        }
    }

})