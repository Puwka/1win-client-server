import Vue from 'vue'
import Router from 'vue-router'
import BooksTable from '@/components/BooksTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BooksTable',
      component: BooksTable
    }
  ]
})
