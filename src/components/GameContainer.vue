<script setup>
import PreRound from './PreRound.vue'
import InRound from './InRound.vue'
import PostRound from './PostRound.vue'
import PostGame from './PostGame.vue'

const props = defineProps({ game: Object })
const components = { PreRound, InRound, PostRound, PostGame }
</script>

<template>
  <component :is="components[props.game.currentGame.state]" :game="props.game"/>
</template>

<style module>

</style>
