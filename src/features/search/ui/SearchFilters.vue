<template lang="pug">
  .search-filters
    form(@submit.prevent="applyFilters")
      .filters-grid
        SharedInput(
          v-model="localFilters.query"
          placeholder="Поиск..."
          @input="onInputChange"
        )

        SharedSelect(
          v-model="localFilters.category"
          :options="categoryOptions"
          placeholder="Все категории"
          @update:modelValue="onSelectChange"
        )

        SharedInput(
          v-model="minPriceString"
          type="number"
          placeholder="Мин. цена"
          @input="onPriceInput"
        )

        SharedInput(
          v-model="maxPriceString"
          type="number"
          placeholder="Макс. цена"
          @input="onPriceInput"
        )

        .sort-controls
          SharedSelect(
            v-model="localFilters.sortBy"
            :options="sortOptions"
            @update:modelValue="onSelectChange"
          )

          SharedSelect(
            v-model="localFilters.sortOrder"
            :options="orderOptions"
            @update:modelValue="onSelectChange"
          )

      // Пагинация и кнопки на одном уровне
      .footer-section
        .pagination-left(v-if="pagination.totalPages > 1")
          search-pagination(
            :pagination="pagination"
            @page-change="onPageChange"
          )

        .actions-right
          SharedButton(
            type="submit"
            variant="primary"
          ) Применить

          SharedButton(
            @click="resetFilters"
            variant="secondary"
          ) Сбросить
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Pagination, SearchFilters } from '@/entities/product/model/types.ts'
import SharedInput from '@/shared/ui/Input.vue'
import SharedSelect from '@/shared/ui/Select.vue'
import SharedButton from '@/shared/ui/Button.vue'
import SearchPagination from '@/features/search/ui/SearchPagination.vue'

type Props = {
  filters: SearchFilters
  pagination: Pagination
}

type Emits = {
  (e: 'update:filters', value: SearchFilters): void
  (e: 'search'): void
  (e: 'page-change', page: number): void
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const onPageChange = (page: number) => {
  emit('page-change', page)
}

const localFilters = ref<SearchFilters>({ ...props.filters })

// Для числовых полей как строк
const minPriceString = computed({
  get: () => localFilters.value.minPrice?.toString() || '',
  set: (value) => {
    localFilters.value.minPrice = value ? Number(value) : null
  },
})

const maxPriceString = computed({
  get: () => localFilters.value.maxPrice?.toString() || '',
  set: (value) => {
    localFilters.value.maxPrice = value ? Number(value) : null
  },
})

const categoryOptions = [
  { value: '', label: 'Все категории' },
  { value: 'electronics', label: 'Электроника' },
  { value: 'books', label: 'Книги' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'food', label: 'Еда' },
  { value: 'sport', label: 'Спорт' },
]

const sortOptions = [
  { value: 'name', label: 'По имени' },
  { value: 'price', label: 'По цене' },
  { value: 'category', label: 'По категории' },
]

const orderOptions = [
  { value: 'asc', label: 'По возрастанию' },
  { value: 'desc', label: 'По убыванию' },
]

watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters }
  },
  { deep: true },
)

const onInputChange = () => {
  emit('update:filters', localFilters.value)
}

const onPriceInput = () => {
  emit('update:filters', localFilters.value)
}

const onSelectChange = () => {
  emit('update:filters', localFilters.value)
}

const applyFilters = () => {
  emit('search')
}

const resetFilters = () => {
  localFilters.value = {
    query: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'name',
    sortOrder: 'asc',
  }
  emit('update:filters', localFilters.value)
}
</script>

<style scoped>
.search-filters {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;
}

form {
  width: 100%;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sort-controls {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.footer-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  gap: 1rem;
}

.pagination-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.actions-right {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}
</style>
