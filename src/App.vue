<template>
  <div :class="$style.mainContainer">
    <div :class="$style.pad">
      <MainMenu v-if="!game.currentGame" :game="game"/>
      <GameContainer v-if="game.currentGame" :game="game"/>
    </div>
  </div>
</template>

<script setup>
import MainMenu from './components/MainMenu.vue'
import GameContainer from './components/GameContainer.vue'
import GameState from '@/gamestate'
import { ref } from 'vue'
const game = ref(new GameState())
</script>
<style>
body,html,#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
}
#app {
  text-align: center;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
h1,h2,h3,h4,h5,h6,p {
  margin: 0 0 .5em 0;
}
</style>
<style module>
@import 'colors.css';

.mainContainer {
  height: 100%;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: var(--color-background);
  color: var(--color-foreground);
  display: flex;
}
.pad{
  border: 1rem solid transparent;
  position: relative;
  flex: 1 1 100%;
}
</style>
