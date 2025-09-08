<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import GameSetup from '@/components/GameSetup.vue'
import { i18n } from '@/main'

const { t } = useI18n()
const isStartingNewGame = ref(false)
defineProps({ game: Object })

function updateSavedLanguage () {
  localStorage.setItem('language', i18n.global.locale.value)
}
</script>

<template>
  <div :class="$style.layout">
    <div v-if="!isStartingNewGame">
      <h1 :class="$style.title">Alias</h1>
      <button :class="ui.button" @click="isStartingNewGame=true">{{ t('NewGame') }}</button>
      <p>&nbsp;</p>
      <button :class="ui.smallButton" @click="game.resetUsedWords()">{{ t('ResetUsedWords') }}</button>
    </div>
    <div v-else>
      <GameSetup :game="game"/>
    </div>
    <label v-if="!isStartingNewGame">{{ t('Language') }} <select v-model="$i18n.locale" @change="updateSavedLanguage">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select></label>
  </div>
</template>
<style module="ui" src="@/ui.css"/>
<style module>
.layout {
  display: grid;
  grid-template-rows: 1fr max-content;
  height: 100%;
  align-items: center;
}
.title{
  margin-bottom: 50px;
  font-size: 10vh;
  background: linear-gradient(37deg, #bea8ff, #5d37cd);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: 1s ease-in-out 0s infinite alternate bg,
   1.33s linear 0s infinite alternate rot;
}
@keyframes bg {
  from{
    transform: scale(1);
  }
  to{
    transform: scale(1.1);
  }
}
@keyframes rot {
  from{
    filter: hue-rotate(0deg);
  }
  to{
    filter: hue-rotate(360deg);
  }
}
</style>
<i18n src="@/localization.json"/>
