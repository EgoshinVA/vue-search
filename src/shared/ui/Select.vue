<template lang="pug">
  .select-wrapper
    select.select(
      :value="modelValue"
      @change="handleChange($event)"
    )
      option(
        v-if="placeholder"
        value=""
        disabled
        hidden
      ) {{ placeholder }}
      option(
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      ) {{ option.label }}
</template>

<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue?: string | number
  options: Option[]
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.select-wrapper {
  width: 100%;
}

.select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
}

.select:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.select option {
  padding: 0.5rem;
}
</style>
