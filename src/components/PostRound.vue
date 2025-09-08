<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({ game: Object })
</script>

<template>
  <h1>
    <i18n-t keypath="RoundEnd">
      <span>{{ props.game.currentGame.round }}</span>
      <span :class="ui.teamName">{{ props.game.currentGame.rules.teams[props.game.currentGame.playingTeam] }}</span>
    </i18n-t>
  </h1>
  <div :class="$style.list">
      <p v-for="word in props.game.currentGame.currentRound" :key="word.word" :class="$style.lr"><label><span :class="$style.word">{{ word.word }}</span> <input type="checkbox" v-model="word.isCorrect"/></label></p>
  </div>
  <p>{{ t('Total', props.game.currentGame.roundScore(props.game.currentGame.currentRound)) }}</p>
  <button :class="ui.button" @click="props.game.currentGame.finalizeRound()">{{ t('NextRound') }}</button>
</template>
<style module="ui" src="@/ui.css"/>
<style module>
.lr{
  display: flex;
}
.word{
  text-transform: uppercase;
}
.list{
  composes: list from '@/ui.css';
  max-height: 60vh;
  overflow-y: auto;
}
.lr>label{
  display: flex;
  flex: 1 1 100%;
  text-align: left;
}
.lr>label>span{
  flex: 1 1 100%;
}
</style>
<i18n src="@/localization.json"/>
