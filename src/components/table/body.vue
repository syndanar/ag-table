<template>
  <div class="data-table__body">
    <div class="data-table__row thead">
      <div class="data-table__cell th multiselect" v-if="tableDefs.multiselect"></div>
      <div class="data-table__cell th"
           v-for="(columnDef, idx) in columnDefs"
           :key="`data-table-th-${idx}`"
           :class="{
             sortable: columnDef.sortable
           }"
           @click="thClick(columnDef)"
      >
        {{columnDef.headerName}}
        <span
          class="sort"
          v-if="sort.column === columnDef"
          :class="{asc: sort.dir === 'asc', desc: sort.dir === 'desc'}"
        >
          <img :src="IconSort"/>
        </span>
      </div>
      <div class="data-table__cell th actions" v-if="rowDefs.actions">
        <span v-if="rowDefs.actionsHeader" v-html="rowDefs.actionsHeader"></span>
      </div>
    </div>
    <template v-if="rowData.length">
      <div class="data-table__busy" v-if="tableDefs.loading">
        <v-progress-linear
          indeterminate
          color="cyan"
        ></v-progress-linear>
      </div>
      <data-table-row
        v-for="(row, row_idx) in computedRawData"
        :key="`data-table-row-${row_idx}`"
        :row="row"
        v-on="$listeners"
        v-bind="$props"
        @toggle="toggleSelected(row)"
      />
    </template>
    <template v-else>
      <div class="no-data-message">Нет данных для отображения</div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { TColDef, TRowDefs, TTableDefs } from '@/components/table/types'
// import binds from '@/common/vuetify/table'
import { ColDef, GridOptions } from 'ag-grid-community'
import defu from 'defu'
import DataTableRow from '@/components/table/row.vue'

@Component({
  name: 'data-table-body',
  components: { DataTableRow }
})
export default class DataTableBody extends Vue {
  @Prop({ required: true }) rowData: any[]

  @Prop({ required: true }) columnDefs: Array<TColDef>

  @Prop({ required: true }) rowDefs: TRowDefs

  @Prop({ required: true }) tableDefs: TTableDefs

  @Watch('multiselect', {})
  onMultiselectChanged (): void { this.tableDefs.selectedRows = [] }

  private gridOptionsVM: GridOptions = {}

  private IconSort = require('@/assets/icons/sort.svg')

  private sort: { column: TColDef, dir: 'asc' | 'desc' } = {
    column: null,
    dir: 'asc'
  }

  setEditCell (row: never, columnDef: TColDef): void {
    row[columnDef.field].edit = true
  }

  get defaultGridOptions (): GridOptions {
    const defaultGridOptions: GridOptions = {
      editType: '',
      groupSelectsChildren: false
    }

    defaultGridOptions.suppressClickEdit = !Object.prototype.hasOwnProperty.call(this.actions, 'edit')

    return defaultGridOptions
  }

  get computedRawData (): Array<never> {
    if (!this.sort.column) {
      return this.rowData
    }
    return this.rowData.sort((a, b) => {
      const field = this.sort.column?.field
      const f = a[field] > b[field] ? 1 : -1
      return this.sort.dir === 'asc' ? f : -1 * f
    })
  }

  get multiselect (): boolean {
    return this.tableDefs.multiselect
  }

  get gridOptions (): GridOptions {
    return defu(this.gridOptionsVM, this.defaultGridOptions)
  }

  thClick (columnDef: TColDef): void {
    this.sort = {
      column: columnDef,
      dir: this.sort.column === columnDef ? (this.sort.dir === 'desc' ? 'asc' : 'desc') : 'asc'
    }
  }

  async onGridReady (params: GridOptions) {
    this.gridOptionsVM = params
    this.$emit('gridReady', this.gridOptionsVM)
  }

  toggleSelected (row): void {
    if (this.tableDefs.multiselect) {
      this.tableDefs.selectedRows.includes(row)
        ? this.tableDefs.selectedRows.splice(this.selectedRows.indexOf(row), 1)
        : this.tableDefs.selectedRows.push(row)
    }
  }
}
</script>

<style lang="scss">
.data-table__body {
  margin-top: 1rem;
  position: relative;
  .data-table__busy {
    background: rgba(255,255,255,0.6);
    z-index: 1;
    position: absolute;
    left: 0;
    top: 53px;
    right: 0;
    bottom: 0;
  }
  .no-data-message {
    padding: 1rem;
    text-align: center;
  }
  .data-table__row {
    width: 100%;
    display: flex;
    transition: background-color 0.25s;
    &.selected {
      background-color: #6FCF97;
    }
    &:hover:not(.selected):not(.thead) {
      background-color: #E6E4EA;
    }
    &.thead {
      background-color: #DAD9DE;
    }
    .data-table__cell {
      flex: 1;
      line-height: 53px;
      padding: 0 1rem;
      &.multiselect {
        width: 3rem;
        max-width: 3rem;
      }
      &.editable {
        cursor: pointer;
      }
      &.sortable {
        cursor: pointer;
        .sort {
          &.desc img {
            transform: rotate(180deg);
          }
          img {
            height: 10px;
          }
        }
      }
    }
  }
}

</style>
