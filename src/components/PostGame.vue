<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({ game: Object })
</script>

<template>
  <h1>{{t('GameOver')}}</h1>
  <h2>{{t('FinalScores')}}</h2>
  <div :class="$style.teams">
  <p v-for="(t,i) in props.game.currentGame.rules.teams" :key="i">
    <span :class="ui.teamName">{{t}}</span>
    {{game.currentGame.gameScore(i)}}
  </p>
  </div>
  <h2>{{t('Winner')}}</h2>
  <h2 :class="ui.teamName">{{ game.currentGame.rules.teams[game.currentGame.winningTeam] }}</h2>
  <p>
    <button :class="ui.button" @click="game.start(game.currentGame.rules)">{{t('NewGameLikeThis')}}</button>
  </p>
  <p>
    <button :class="ui.button" @click="game.reset()">{{t('NewGameSetup')}}</button>
  </p>
</template>
<style module="ui" src="@/ui.css"/>
<style module>
.teams{
  composes: list from '../ui.css';
  max-height: 6rem;
  overflow-y: auto;
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
