<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({ game: Object })
</script>

<template>
  <div :class="$style.layout">
    <h1>{{ t('Round', {round: props.game.currentGame.round}) }}</h1>
    <h2><i18n-t keypath="PrepareTeam"><span :class="ui.teamName">{{ props.game.currentGame.rules.teams[props.game.currentGame.playingTeam] }}</span></i18n-t></h2>
    <div :class="$style.teams">
      <p v-for="(t,i) in props.game.currentGame.rules.teams" :key="i">
        <span :class="ui.teamName">{{ t }}</span>
        {{ game.currentGame.gameScore(i) }}
      </p>
    </div>
    <div>
      <button :class="ui.button" @click="game.currentGame.startRound()">{{ t('StartRound') }}</button>
    </div>
    <div>
      <button :class="ui.smallButton" @click="game.reset()">{{ t('ExitGame') }}</button>
    </div>
  </div>
</template>
<style module="ui" src="@/ui.css"/>
<style module>
.layout {
  height: 100%;
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
}
.teams{
  composes: list from '../ui.css';
  text-align: left;
}
.teams>p{
  margin: 0.25em 0;
  display: flex;
}
.teams>p>span{
  flex: 1 1 100%;
}
</style>
<i18n src="@/localization.json"/>
