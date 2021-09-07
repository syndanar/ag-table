<template>
  <div class="c-modal">
    <div class="c-modal__head">
      <p>
        {{ title }}
      </p>
    </div>

    <div class="c-modal__body">
      <slot name="default"/>
    </div>

    <div class="c-modal__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'c-modal',

  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.c-modal {
  background-color: #F3F2F7;

  padding: 28px 30px 43px 30px;

  &__head {
    margin-bottom: 20px;

    p {
      font-size: 17px;
      font-weight: 700;
      color: $c-basic;
    }
  }

  &__body {
    margin-bottom: 30px;

    font-size: 14px;
    color: $c-grey;
  }
}
</style>
