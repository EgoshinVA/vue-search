<template lang="pug">
  button.button(
    :type="type"
    :class="[variant, size]"
    @click="$emit('click')"
  )
    slot
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'medium',
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

/* Variants */
.primary {
  background-color: #42b883;
  color: white;
}

.primary:hover {
  background-color: #33a06f;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.secondary:hover {
  background-color: #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.outline {
  background-color: transparent;
  color: #42b883;
  border: 1px solid #42b883;
}

.outline:hover {
  background-color: rgba(66, 184, 131, 0.1);
}

/* Sizes */
.small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
</style>
