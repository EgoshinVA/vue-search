<template lang="pug">
  .pagination(v-if="pagination.totalPages > 1")
    shared-button(
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      variant="secondary"
      size="small"
    )

    .page-numbers
      span(
        v-for="page in visiblePages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      ) {{ page }}

    shared-button(
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === pagination.totalPages"
      variant="secondary"
      size="small"
    )

    .page-info
      | Страница {{ currentPage }} из {{ pagination.totalPages }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Pagination } from '@/entities/product/model/types.ts'

type Props = {
  pagination: Pagination
}

type Emits = {
  (e: 'page-change', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentPage = computed(() => props.pagination.page)

const visiblePages = computed(() => {
  const total = props.pagination.totalPages
  const current = currentPage.value
  const delta = 2
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (total > 1) {
    range.push(total)
  }

  return range
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= props.pagination.totalPages) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-numbers span {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  min-width: 40px;
  text-align: center;
}

.page-numbers span:hover:not(.active) {
  background: #f0f0f0;
}

.page-numbers span.active {
  background: #3498db;
  color: white;
}

.page-info {
  margin-left: 1rem;
  color: #666;
  font-size: 0.9rem;
}
</style>
