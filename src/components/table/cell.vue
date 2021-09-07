<template>
  <div
    class="data-table__cell td"
    ref="cell"
    :class="{editable: !!columnDef.editable, placeholder: !cell }"
    :contenteditable="edit"
    @dblclick="startEdit"
    @blur="stopEdit"
    v-html="computedValue"
    v-on="$listeners"
    @keydown="onKeydown"
  >
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { TColDef, TCellData } from '@/components/table/types'

@Component({
  name: 'data-table-cell'
})
export default class DataTableCell extends Vue {
  @Prop({ required: true }) cell: string

  @Prop({ required: true }) columnDef: TColDef

  @Prop({ required: true }) row: any

  protected edit = false

  get computedValue (): void {
    return this.cell || (this.edit ? '' : this.columnDef.headerName)
  }

  onKeydown ($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      $event.preventDefault()
      this.$el.blur()
    }
  }

  startEdit (): void {
    if (this.columnDef.editable) {
      this.edit = true
      this.$nextTick(() => {
        this.$el.focus()
      })
    }
  }

  stopEdit ($event: FocusEvent): void {
    if (this.columnDef.editable) {
      this.edit = false

      const data: TCellData = {
        row: this.row,
        columnDef: this.columnDef,
        value: $event.target.innerText
      }
      this.$emit('update:cell', data)
    }
  }
}
</script>

<style scoped lang="scss">
.data-table__cell {
  &.placeholder {
    color: #9A99A2;
  }
  &.td {
    line-height: 1rem;
    min-height: 2.5rem;
    padding: 0.75rem 1rem;
  }
}
</style>
