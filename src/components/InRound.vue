<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onBeforeUnmount } from 'vue'
import SwipeBox from '@/components/SwipeBox.vue'

const { t } = useI18n()
const props = defineProps({ game: Object })
const roundTimeLeft = ref(props.game.currentGame.roundTimeLeft)

const intervalId = setInterval(function () {
  if (props.game.currentGame) {
    roundTimeLeft.value = props.game.currentGame.roundTimeLeft
    props.game.currentGame.checkTimer()
  }
}, 1000)
onBeforeUnmount(() => clearInterval(intervalId))
</script>

<template>
  <SwipeBox @swipeup="props.game.currentGame.record(true)" @swipedown="props.game.currentGame.record(false)" :class="$style.layout">
    <h3>{{ t('Round', {round: props.game.currentGame.round}) }}</h3>
    <h4>
      <i18n-t keypath="Team"><span :class="ui.teamName">{{ props.game.currentGame.rules.teams[props.game.currentGame.playingTeam] }}</span></i18n-t>
    </h4>
    <h2>{{ roundTimeLeft }}</h2>
    <div :class="$style.fitLimiter">
      <p :class="$style.fitContainer">
        <span><span>{{ props.game.currentGame.currentWord }}</span></span>
        <span aria-hidden="true">{{ props.game.currentGame.currentWord }}</span>
      </p>
    </div>
    <div :class="$style.buttons">
      <button :class="$style.skip" @click="props.game.currentGame.record(false)">{{ t('Skip') }}</button>
      <button :class="$style.ok" @click="props.game.currentGame.record(true)">{{ t('Correct') }}</button>
    </div>
  </SwipeBox>
</template>
<style module="ui" src="@/ui.css"/>
<style module>
.layout{
  display: grid;
  height: 100%;
  grid-template-rows: repeat(3,auto) 1fr auto;
}
.buttons{
  display: grid;
  grid-column-gap: .5em;
  grid-template-columns: 1fr 1fr;
}
.skip{
  composes: smallButton from '../ui.css';
  background: linear-gradient(37deg, #ffa6a6, #ffb3a6);
}
.ok{
  composes: smallButton from '../ui.css';
  background: linear-gradient(37deg, #e6ffa6, #caffa6);
}
.fitLimiter {
  text-transform: uppercase;
  letter-spacing: .33em;
  font-weight: bold;
  margin: 3em 0 3em 0;
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
<i18n src="@/localization.json"/>
