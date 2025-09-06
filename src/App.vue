<template>
  <MainMenu v-if="!game.currentGame" :game="game"/>
  <GameContainer v-if="game.currentGame" :game="game"/>
</template>

<script setup>
import MainMenu from './components/MainMenu.vue'
import GameContainer from './components/GameContainer.vue'
import GameState from '@/gamestate'
import { inject, ref } from 'vue'
const locale = inject('locale')
const game = ref(new GameState(locale))
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
}
</style>
