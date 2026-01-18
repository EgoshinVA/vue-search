<template lang="pug">
  .search-page
    h1 Поиск товаров

    search-filters(
      :filters="filters"
      :pagination="pagination"
      @update:filters="updateFilters"
      @search="performSearch"
      @page-change="changePage"
    )

    search-results(
      :products="products"
      :pagination="pagination"
      :loading="loading"
      @page-change="changePage"
    )
</template>

<script setup lang="ts">
import { useSearchResults } from '@/features/search/model/useSearchResults.ts'
import SearchFilters from '@/features/search/ui/SearchFilters.vue'
import SearchResults from '@/features/search/ui/SearchResults.vue'

const { products, pagination, loading, filters, updateFilters, changePage, performSearch } =
  useSearchResults()
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-page h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}
</style>
