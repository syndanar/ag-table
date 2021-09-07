import '@/scss/app.scss'
import Vue, { VueConstructor } from 'vue'
import vuetify from '@/plugins/vuetify'

import ExampleTable from './example/table.vue'

import Table from './components/table/index.vue'

function install (Vue: VueConstructor): void {
  Vue.component('data-table', Table)
}

const DataTable = {
  install
}

if (process.env.NODE_ENV === 'development') {
  Vue.use(DataTable)
  new Vue({
    vuetify,
    render: h => h(ExampleTable)
  }).$mount('#app')
}

export default DataTable

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DataTable)
}
