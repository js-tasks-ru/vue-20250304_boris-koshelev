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

:deep(img) {
  object-fit: scale-down;
}

:deep(video) {
  object-fit: scale-down;
}

:deep(picture) {
  object-fit: scale-down;
}
</style>
