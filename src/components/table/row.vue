<template>
  <div
    class="data-table__row"
    @click="$emit('toggle')"
    :class="{selected: isSelected}"
  >
    <div class="data-table__cell td multiselect" v-if="tableDefs.multiselect">
      <input type="checkbox"
             :value="row"
             v-model="tableDefs.selectedRows"
      />
    </div>
    <data-table-cell
      v-for="(columnDef, column_idx) in columnDefs"
      :key="`data-table-cell-${column_idx}`"
      :cell="getCell(columnDef)"
      :column-def="columnDef"
      :row="row"
      v-on="$listeners"
    />

    <div class="data-table__cell th actions" v-if="rowDefs.actions">
      <v-btn
        v-for="(action, idx) in rowDefs.actions"
        :key="`action-${idx}`"
        v-bind="actionBindings(action.buttonDef)"
        @click="$emit(action.action, row)"
        class="mr-2"
      >
        <img :src="action.icon" />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { TColDef, TRowDefs, TTableDefs } from '@/components/table/types'
import { ColDef } from 'ag-grid-community'
import DataTableCell from '@/components/table/cell.vue'
import bindings from '@/common/vuetify/btn'
import { TButton } from '@/common/vuetify/types'

@Component({
  name: 'data-table-row',
  components: { DataTableCell }
})
export default class DataTableRow extends Vue {
  @Prop({ required: true }) row: any

  @Prop({ required: true }) columnDefs: Array<TColDef>

  @Prop({ required: true }) rowDefs: TRowDefs

  @Prop({ required: true }) tableDefs: TTableDefs

  getCell (columnDef: ColDef): string {
    return this.row[columnDef.field]
  }

  get isSelected (): boolean {
    return this.tableDefs.selectedRows.includes(this.row)
  }

  actionBindings (buttonDefs: TButton): TButton {
    return bindings(buttonDefs)
  }
}
</script>
