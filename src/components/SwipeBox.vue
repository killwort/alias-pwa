<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Emits "swipeup" and "swipedown" when a vertical swipe is detected.
const emit = defineEmits(['swipeup', 'swipedown'])

// Bind this to the element you want to listen on.
const swipeArea = ref(null)

// Tunables
const THRESHOLD_PX = 50 // minimum vertical distance
const HORIZONTAL_TOLERANCE = 60 // ignore if horizontal drift exceeds this
const ALLOWED_TIME_MS = 800 // must complete within this time

let startX = 0
let startY = 0
let startTime = 0
let activePointerId = null

function onPointerDown (e) {
  // Only track one pointer at a time (finger/mouse/pen)
  if (activePointerId !== null) return
  activePointerId = e.pointerId
  startX = e.clientX
  startY = e.clientY
  startTime = performance.now()
}

function onPointerUp (e) {
  if (e.pointerId !== activePointerId) return
  const dt = performance.now() - startTime
  const dx = e.clientX - startX
  const dy = e.clientY - startY

  // Reset for next gesture
  activePointerId = null

  // Must be mostly vertical, far enough, and fast enough
  const verticalEnough = Math.abs(dy) >= THRESHOLD_PX
  const verticalDominant = Math.abs(dx) <= HORIZONTAL_TOLERANCE && Math.abs(dy) > Math.abs(dx)
  const quickEnough = dt <= ALLOWED_TIME_MS

  if (verticalEnough && verticalDominant && quickEnough) {
    if (dy < 0) emit('swipeup')
    else emit('swipedown')
  }
}

function onPointerCancel (e) {
  if (e.pointerId === activePointerId) activePointerId = null
}

onMounted(() => {
  const el = swipeArea.value
  if (!el) return

  // Enable pointer event stream on element
  el.addEventListener('pointerdown', onPointerDown, { passive: true })
  el.addEventListener('pointerup', onPointerUp, { passive: true })
  el.addEventListener('pointercancel', onPointerCancel, { passive: true })
})

onBeforeUnmount(() => {
  const el = swipeArea.value
  if (!el) return
  el.removeEventListener('pointerdown', onPointerDown)
  el.removeEventListener('pointerup', onPointerUp)
  el.removeEventListener('pointercancel', onPointerCancel)
})

// Optional: expose the ref to parent if needed
defineExpose({ swipeArea })
</script>

<template>
  <div ref="swipeArea" style="touch-action: pan-x; user-select: none">
    <slot />
  </div>
</template>
