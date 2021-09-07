<template>
  <v-btn
    v-bind="buttonBindings"
    v-show="button.show"
    @click="$emit(button.action)"
  >
    <img :src="button.icon" v-if="button.icon" />
    <span>{{button.label}}</span>
  </v-btn>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { THeadButton } from '@/components/table/types'
import { TButton } from '@/common/vuetify/types'
import bindings from '@/common/vuetify/btn'

@Component({
  name: 'data-table-head-button'
})
export default class DataTableHead extends Vue {
  @Prop({}) button: THeadButton;

  get buttonBindings (): TButton {
    return bindings(this.button.defs)
  }

  get color (): string {
    return this.button.color || 'primary'
  }
}
</script>

<style lang="scss" scoped>
span {
  margin-left: 0.25rem;
}
</style>
