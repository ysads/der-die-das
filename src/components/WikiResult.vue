<template>
  <div class="result">
    <p v-if="data.error">
      {{ data.error }}
    </p>
    <p v-else>
      <strong class="result-article">{{ data.article }}</strong>
      <span class="result-title">{{ result.title }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { WikiPageResult } from '../api';

const NOUN_REGEX = /Adjektiv\|Deutsch/;
const GENDER_REGEX = /Genus=([a-z]+)/g;
const GENDER_TABLE = {
  m: 'Der',
  f: 'Die',
  n: 'Das',
};

const parseText = (content: string ) => {
  if (NOUN_REGEX.test(content)) {
    return {
      error: 'Nicht ein Substantiv auf Deutsch',
      article: null,
    };
  }
  
  const genderMatches = GENDER_REGEX.exec(content)
  if (!genderMatches || genderMatches.length < 2) {
    return {
      error: 'Kein Genus gefunden',
      article: null,
    };
  }

  return {
    error: null,
    // @ts-expect-error - if we got here, we know we have a match
    article: GENDER_TABLE[genderMatches[1]]
  };
};

export default defineComponent({
  props: {
    result: {
      type: Object as PropType<WikiPageResult>,
      default: () => ({}),
    }
  },
  setup(props) {
    const data = computed(() => parseText(props.result.content));

    return { data };
  },
});
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  justify-content: center;
  font-size: 24px;

  &-article {
    color: #211f1f;
    background: #e8da74;
    border-radius: 50%;
    line-height: 32px;
    width: 32px;
    display: inline-block;
    font-weight: 600;
    margin-right: 10px;
    padding: 16px;
  }
}
</style>
