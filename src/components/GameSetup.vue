<script setup>
import wordlists from '@/wordlists'
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import teamName from '@/teamName'
const { t } = useI18n()
const props = defineProps({ game: Object })
const locale = inject('locale')
const lists = ref(wordlists[locale])
const localRules = Object.assign({}, props.game.rules)
localRules.teams = [teamName(locale), teamName(locale)]
const gameRules = ref(localRules)

function startGame () {
  props.game.start(gameRules.value)
}
</script>

<template>
  <label>
    {{t('Wordlist')}}
  <select v-model="gameRules.list">
      <option v-for="(list, listName) in lists" :value="listName" :key="listName">{{ t('Wordlists.'+listName)}}</option>
  </select>
  </label>
  <h3>{{t('Teams')}}</h3>
  <p v-for="(team,i) in gameRules.teams" :key="i">{{team}} <button @click="gameRules.teams.splice(i,1)">&times;</button></p>
  <button @click="gameRules.teams.push(teamName(locale))">{{t('AddTeam')}}</button>
  <h3>{{t('Rules')}}</h3>
  <p><label><input type="checkbox" v-model="gameRules.fines" /> {{t('RuleFines')}}</label></p>
  <p><label><input type="checkbox" v-model="gameRules.lastWordUnlimited" /> {{t('RuleLastWordUnlimited')}}</label></p>
  <p><label><input type="checkbox" v-model="gameRules.lastWordAllTeams" /> {{t('RuleLastWordAllTeams')}}</label></p>
  <p><label>{{t('RuleTime')}} <input type="number" v-model="gameRules.time" /></label></p>
  <p><label>{{t('RuleTargetScore')}} <input type="number" v-model="gameRules.targetScore" /></label></p>
  <p><button :disabled="gameRules.teams.length<2" @click="startGame">{{t('StartGame')}}</button></p>
</template>

<style module>

</style>
<i18n>
{
  "ru": {
    "Wordlist": "Список слов",
    "Teams": "Команды",
    "AddTeam": "Добавить команду",
    "Rules": "Правила",
    "RuleFines": "Штрафы за пропуски",
    "RuleLastWordUnlimited": "Последнее слово без ограничений",
    "RuleLastWordAllTeams": "Последнее слово для всех команд",
    "RuleTime": "Время раунда",
    "RuleTargetScore": "Целевой счёт",
    "StartGame": "Начать игру",
    "Wordlists": {
      "custom_15kfun": "15 тысяч обычных слов",
      "custom_clearmeanings": "5 тысяч однозначных слов",
      "orange_brainstorm": "Краденый сложный",
      "orange_easy": "Краденый простой",
      "orange_optimus": "Краденый средний",
      "thehat_celebrities": "Шляпа/знаменитости",
      "thehat_easy": "Шляпа/простой",
      "thehat_hard": "Шляпа/сложный",
      "thehat_normal": "Шляпа/средний"
    }
  }
}
</i18n>
