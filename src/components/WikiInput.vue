<template>
  <div class="input-wrapper">
    <h1 class="title">Der • Die • Das</h1>
    <input
      v-model="value"
      class="input"
      type="text"
      placeholder="Schreibe ein Wort"
      @input="debounceEmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(_, { emit }) {
    let timer = setTimeout(() => {}, 0);
    const value = ref('');

    onUnmounted(() => clearTimeout(timer));

    const debounceEmit = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        emit('change', value.value);
      }, 500);      
    }

    return { value, debounceEmit }
  },
});
</script>


<style lang="scss" scoped>
.title {
  font-size: 32px;
  margin-bottom: 50px;
  color: #509170;
}
.input {
  color: #211f1f;
  background: #8bc5a8;
  border: 0;
  border-radius: 8px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 24px;
  outline: none;
  padding: 12px 16px;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 300px;

  &-wrapper {
    padding-top: 60px;
    padding-bottom: 20px;
    background: #acd1c0;
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(74, 131, 102, 0.6);
  }
}
</style>