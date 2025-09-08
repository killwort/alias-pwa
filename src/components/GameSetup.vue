<script setup>
import wordlists from '@/wordlists'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/main'
import teamName from '@/teamName'

const { t } = useI18n()
const props = defineProps({ game: Object })
const lists = ref(wordlists[i18n.global.locale.value])
const localRules = Object.assign({}, props.game.rules)
localRules.teams = [teamName(i18n.global.locale.value), teamName(i18n.global.locale.value)]
const gameRules = ref(localRules)

function startGame () {
  props.game.start(gameRules.value)
}
</script>

<template>
  <div :class="$style.setup">
    <h1>{{t('GameSetup')}}</h1>
    <h3>{{ t('Teams') }}</h3>
    <div :class="$style.teams">
      <p v-for="(team,i) in gameRules.teams" :key="i">
        <span :class="ui.teamName">{{ team }}</span>
        <button @click="gameRules.teams.splice(i,1)">&times;</button>
      </p>
    </div>
    <div :class="$style.center">
      <button :class="ui.smallButton" @click="gameRules.teams.push(teamName($i18n.locale))">{{ t('AddTeam') }}</button>
    </div>
    <h3>{{ t('Rules') }}</h3>
    <p>
    <label>
      {{ t('Wordlist') }}
      <div :class="$style.teams">
        <p v-for="(list, listName) in lists" :key="listName"><label><input type="checkbox" v-model="gameRules.list" :value="listName"/> {{ t('Wordlists.' + listName) }}</label></p>
      </div>
    </label>
    </p>
    <p v-if="gameRules.list.length>1"><label><input type="checkbox" v-model="gameRules.alternateWordChoice"/> {{ t('RuleAlternateWordChoice') }}</label></p>
    <p><label><input type="checkbox" v-model="gameRules.fines"/> {{ t('RuleFines') }}</label></p>
    <p><label><input type="checkbox" v-model="gameRules.lastWordUnlimited"/> {{ t('RuleLastWordUnlimited') }}</label></p>
    <!--p><label><input type="checkbox" v-model="gameRules.lastWordAllTeams"/> {{ t('RuleLastWordAllTeams') }}</label></p-->
    <p><label>{{ t('RuleTime') }} <input type="number" v-model="gameRules.time"/></label></p>
    <p><label>{{ t('RuleTargetScore') }} <input type="number" v-model="gameRules.targetScore"/></label></p>
    <div :class="$style.center">
      <button :class="ui.button" :disabled="gameRules.teams.length<2" @click="startGame">{{ t('StartGame') }}</button>
    </div>
  </div>
</template>
<style module="ui" src="@/ui.css"/>
<style module>
.setup{
  text-align: left;
}
.teams{
  composes: list from '../ui.css';
  max-height: 6rem;
  overflow-y: auto;
}
.teams>p{
  margin: 0.25em 0;
  display: flex;
}
.teams>p>span{
  flex: 1 1 100%;
}
.center{
  text-align: center;
}
</style>
<i18n src="@/localization.json"/>
