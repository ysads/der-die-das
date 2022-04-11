<template>
  <p class="alert" :class="type" role="status">
    <slot />
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type AlertType = 'info' | 'warning' | 'error';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<AlertType>,
      default: 'info',
    },
  },
});
</script>

<style lang="scss" scoped>
.alert {
  border-radius: 8px;
  padding: 32px;
  font-size: 24px;
  font-weight: 600;
  background: #dcd6b8;
}
</style>
