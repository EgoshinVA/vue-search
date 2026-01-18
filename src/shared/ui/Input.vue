<template lang="pug">
  .input-wrapper
    input.input(
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput($event)"
      @change="handleChange($event)"
    )
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  input: [value: string | number]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}
</script>

<style scoped>
.input-wrapper {
  width: 90%;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.input::placeholder {
  color: #aaa;
}
</style>
