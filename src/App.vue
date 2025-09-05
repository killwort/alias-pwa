<template>
  <MainMenu v-if="!game.currentGame"/>
  <Game v-if="game.currentGame"/>
</template>

<script setup>
import { ref } from 'vue'
import { instance } from './gamestate'
import MainMenu from './components/MainMenu.vue'
import Game from './components/Game.vue'

const game = ref(instance)

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
