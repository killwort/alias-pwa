<script setup>
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locale = inject('locale')
</script>

<template>
  <div :class="$style.layout">
    <div>
      {{locale}}
      <button @click="startNewGame">{{ t('NewGame') }}</button>
    </div>
    <label>{{ t('Language') }} <select v-model="locale">
      <option value="ru">{{ t('Russian') }}</option>
      <option value="en">{{ t('English') }}</option>
    </select></label>
  </div>
</template>

<style module>
.layout {
  display: grid;
  grid-template-rows: 1fr max-content;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
}
</style>
<i18n>
{
  "ru": {
    "NewGame": "Играть",
    "Language": "Язык/Language",
    "Russian": "Русский",
    "English": "English"
  }
}
</i18n>
