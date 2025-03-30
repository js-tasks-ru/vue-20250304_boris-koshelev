<script setup lang="ts">
import { computed } from 'vue'
import type { Slot } from 'vue'

const props = defineProps<{
  for?: string
  label?: string
  description?: string
  hint?: string
  showHint?: boolean
  invalid?: boolean
}>()

defineSlots<{
  default?: Slot
  label?: Slot
  description?: Slot
}>()

const hintClasses = computed(() => ({
  'form-group__hint--invalid': props.invalid,
}))

const hintText = computed(() => {
  if (props.invalid || props.showHint) return props.hint
  return ''
})
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label :for="props.for" class="form-group__label">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <div class="form-group__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <div class="form-group__control"><slot></slot></div>
    <div v-if="hint" class="form-group__hint" :class="hintClasses">{{ hintText }}</div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
