<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import SwipeBox from '@/components/SwipeBox.vue'

const { t } = useI18n()
const props = defineProps({ game: Object })
const roundTimeLeft = ref(props.game.currentGame.roundTimeLeft)

setInterval(function () {
  roundTimeLeft.value = props.game.currentGame.roundTimeLeft
  props.game.currentGame.checkTimer()
}, 1000)
</script>

<template>
  <SwipeBox @swipeup="props.game.currentGame.record(true)" @swipedown="props.game.currentGame.record(false)">
    <h3>{{ t('Round', {round: props.game.currentGame.round}) }}</h3>
    <h3>{{ t('Team', {team: props.game.currentGame.rules.teams[props.game.currentGame.playingTeam]}) }}</h3>
    <h2>{{ roundTimeLeft }}</h2>
    <div :class="$style.fitLimiter">
    <h1 :class="$style.fitContainer">
      <span><span>{{ props.game.currentGame.currentWord }}</span></span>
      <span aria-hidden="true">{{ props.game.currentGame.currentWord }}</span>
    </h1>
    </div>
    <div>
      <button @click="props.game.currentGame.record(false)">{{ t('Skip') }}</button>
      <button @click="props.game.currentGame.record(true)">{{ t('Correct') }}</button>
    </div>
  </SwipeBox>
</template>

<style module>
.fitLimiter{
  max-width:600px;
  margin: 0 auto;
  text-transform: uppercase;
  letter-spacing: .33em;
}
.fitContainer {
  display: flex;
  container-type: inline-size;

  --captured-length: initial;
  --support-sentinel: var(--captured-length, 9999px);
}

.fitContainer > [aria-hidden] {
  visibility: hidden;
}

.fitContainer > :not([aria-hidden]) {
  flex-grow: 1;
  container-type: inline-size;

  --captured-length: 100cqi;
  --available-space: var(--captured-length);
}

.fitContainer > :not([aria-hidden]) > * {
  --support-sentinel: inherit;
  --captured-length: 100cqi;
  --ratio: tan(atan2(
    var(--available-space),
    var(--available-space) - var(--captured-length)
  ));
  --font-size: clamp(
    1em,
    1em * var(--ratio),
    var(--max-font-size,infinity * 1px)
    -
    var(--support-sentinel)
  );
  inline-size: var(--available-space);
}

.fitContainer > :not([aria-hidden]) > *:not(.text-fit) {
  display: block;
  font-size: var(--font-size);

  @container (inline-size > 0) {
    white-space: nowrap;
  }
}

.fitContainer > :not([aria-hidden]) > *.text-fit {
  --captured-length2: var(--font-size);
  font-variation-settings: 'opsz' tan(atan2(var(--captured-length2), 1px));
}

@property --captured-length {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}

@property --captured-length2 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
</style>
<i18n>
{
  "ru": {
    "Round": "Раунд {round}",
    "Team": "Команда {team}",
    "Skip": "Пропустить",
    "Correct": "Угадано!"
  }
}
</i18n>
