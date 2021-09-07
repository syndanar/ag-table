<template>
  <v-app>
    <div class="data-table">
      <data-table-head
        :head-defs="headDefs"
        v-on="$listeners"
        v-model="search"
      ></data-table-head>
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-alpine"
        :columnDefs="computedColumnDefs"
        :rowData="computedRowData"
        rowSelection='multiple'
        :defaultColDef="defaultColDef"
        :rowMultiSelectWithClick="false"
        :suppressRowClickSelection="false"
        :frameworkComponents="frameworkComponents"
        @selection-changed="onSelectionChanged"
        v-on="$listeners"
      />
    </div>
  </v-app>

</template>

<script lang="ts">
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'
import Vue, { PropType, VueConstructor } from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { TRowAction, THeadDefs, TRowDefs, TTableDefs, IDataTableActionsCellRendererParams } from '@/components/table/types'
import DataTableHead from '@/components/table/head.vue'
import { ColDef, RowNode, RowSelectedEvent } from 'ag-grid-community'
import buttonBindings from '@/common/vuetify/btn'

const component = Component({
  name: 'data-table',
  components: { DataTableHead, AgGridVue }
})
@component
export default class DataTable extends Vue {
  @Prop({ required: true }) rowData!: any[]

  @Prop({ required: true }) columnDefs!: Array<ColDef>

  @Prop({ required: true }) rowDefs!: TRowDefs

  @Prop({ required: true }) headDefs!: THeadDefs

  @Prop({ required: false }) tableDefs!: TTableDefs

  get computedColumnDefs (): Array<ColDef> {
    const reserved = ['data-table-checkbox', 'data-table-actions']
    const defs: Array<ColDef> = this.columnDefs.filter((def: ColDef) => { return def.field && !reserved.includes(def.field) })
    if (this.multiselect) {
      defs.unshift({
        field: 'data-table-checkbox',
        sortable: false,
        headerName: '',
        editable: false,
        maxWidth: 35,
        resizable: false,
        checkboxSelection: true,
        headerCheckboxSelection: true
      })
    }

    defs.push(
      {
        field: 'data-table-actions',
        sortable: false,
        headerName: 'Функции',
        editable: false,
        resizable: false
      }
    )
    return defs
  }

  onSelectionChanged (event: RowSelectedEvent): void {
    this.tableDefs.selectedRows = []
    event.api.getSelectedNodes().forEach((node: RowNode) => {
      this.tableDefs.selectedRows.push(node.data)
    })
  }

  get multiselect () : boolean {
    return this.tableDefs.multiselect
  }

  protected defaultColDef = {
    flex: 1,
    resizable: true,
    cellClass: 'c-table__cell'
  }

  get frameworkComponents (): VueConstructor {
    return Vue.extend({
      name: 'data-table-actions',
      render (createElement) {
        return createElement('span', {
          staticClass: 'v-table__actions'
        }, ((this.$props as IDataTableActionsCellRendererParams).config || [])
          .map(action => createElement('button', {
            staticClass: 'c-table__actions-button',
            props: {
              key: action.action
            },
            on: {
              '!click': (event: Event) => {
                event.stopPropagation()
                this.$emit(action.action)
              }
            }
          }, [
            createElement('img', { domProps: { src: action.icon } }),
            createElement('span', { attrs: { style: 'display: none;' } }, action.text)
          ])))
      }
    })
  }

  get computedRowData (): Array<any> {
    let rowData = this.rowData
    // Фильтрация по строке поиска
    if (this.search) {
      rowData = rowData.filter(row => {
        return this.columnDefs.filter(def => def.field && row[def.field].toLowerCase().indexOf(this.search.toLowerCase()) !== -1).length > 0
      })
    }

    this.rowDefs.actions.forEach((action: TRowAction) => {
      rowData['data-table-actions'] = `<v-btn
        v-bind="${action.buttonDef ? buttonBindings(action.buttonDef) : ''}"
        @click="$emit(${action.action}, row)"
        class="mr-2"
      >
        <img :src="action.icon" />
      </v-btn>`
    })
    rowData.push()
    return rowData
  }

  protected search = '';
}
</script>
