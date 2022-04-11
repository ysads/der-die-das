<template>
  <main class="app">
    <WikiInput @change="queryWord" />
    <div class="app-container">
      <WikiAlert v-if="!results.length" type="error">
        Nothing found
      </WikiAlert>
      <WikiResult
        v-for="result in results"
        :key="result.id"
        :result="result" 
        class="result-item"
      />
    </div>
  </main>
</template>

<script lang="ts">
import WikiAlert from './components/WikiAlert.vue'
import WikiInput from './components/WikiInput.vue'
import WikiResult from './components/WikiResult.vue'
import { searchWiktionary, WikiPageResult } from './api'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    WikiAlert,
    WikiInput,
    WikiResult,
  },
  setup() {
    const results = ref([] as WikiPageResult[]);

    const queryWord = (word: string) => {
      if (!word) return;

      searchWiktionary(word).then(res => {
        results.value = res;
      });
    }

    return { queryWord, results };
  },
});
</script>


<style lang="scss">
.app {
  text-align: center;

  &-container {
    margin: 0 auto;
    max-width: 900px;
    margin-top: 50px;
  }
}
.result-item + .result-item {
  margin-top: 20px;
}
</style>
