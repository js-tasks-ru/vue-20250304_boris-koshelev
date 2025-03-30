<script setup></script>

<template>
  <div class="stretch-container">
    <slot />
  </div>
</template>

<style scoped>
.stretch-container > * {
  width: 100%;
  height: 100%;
}

.stretch-container > :slotted(img) {
  object-fit: scale-down;
}

.stretch-container > :slotted(video) {
  object-fit: scale-down;
}

.stretch-container > :slotted(picture) {
  object-fit: scale-down;
}
</style>
