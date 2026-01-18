<template lang="pug">
  .search-results
    .loading(v-if="loading") Загрузка...

    .no-results(v-else-if="!products.length")
      | Ничего не найдено. Попробуйте изменить параметры поиска.

    .results(v-else)
      .product-list
        .product-card(v-for="product in products" :key="product.id")
          h3 {{ product.name }}
          .price {{ product.price }} руб.
          .description {{ product.description }}
</template>

<script setup lang="ts">
import type { Product } from '@/entities/product/model/types.ts'

type Props = {
  products: Product[]
  loading: boolean
}

defineProps<Props>()
</script>

<style scoped>
.search-results {
  min-height: 400px;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #888;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.product-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.price {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}
</style>
