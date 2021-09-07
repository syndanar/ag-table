<template>
  <div class="data-table__head">
    <div class="data-table-head__buttons">
      <div v-if="headDefs.filter.show">
        <v-text-field
          type="search"
          label="Type text to search"
          v-model="searchValue"
        />
      </div>
      <div>
        <data-table-head-button
          :button="button"
          v-on="$listeners"
          v-for="(button, idx) in leftButtons"
          :key="`data-table-head-left-button-${idx}`"
        ></data-table-head-button>
      </div>
      <div>
        <data-table-head-button
          v-for="(button, idx) in middleButtons"
          :key="`data-table-head-middle-button-${idx}`"
          :button="button"
          v-on="$listeners"
        ></data-table-head-button>
      </div>
      <div>
        <data-table-head-button
          v-for="(button, idx) in rightButtons"
          :key="`data-table-head-right-button-${idx}`"
          :button="button"
          v-on="$listeners"
        ></data-table-head-button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import { Prop, ModelSync } from 'vue-property-decorator'
import Vue from 'vue'
import { THeadButton, THeadDefs } from '@/components/table/types'
import DataTableHeadButton from '@/components/table/head_button.vue'

@Component({
  name: 'data-table-head',
  components: { DataTableHeadButton }
})
export default class DataTableHead extends Vue {
  /** Описание верхней части таблицы */
  @Prop({}) headDefs: THeadDefs;

  @ModelSync('search', 'change', { type: String }) searchValue!: string

  get leftButtons (): Array<THeadButton> {
    return this.headDefs.buttons.filter(btn => btn.position === 'left')
  }

  get middleButtons (): Array<THeadButton> {
    return this.headDefs.buttons.filter(btn => btn.position === 'middle')
  }

  get rightButtons (): Array<THeadButton> {
    return this.headDefs.buttons.filter(btn => btn.position === 'right')
  }
}
</script>

<style lang="scss">
.data-table-head__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    .v-btn {
      margin-right: 1rem;
    }
    .v-btn:last-child {
      margin-right: 0;
    }
  }
}
.v-text-field {
  margin: 0 0 -20px;
  padding: 0;
  font-size: 14px;
}
</style>
