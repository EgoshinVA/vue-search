import { ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchProducts } from './api/mockApi'
import type { Pagination, Product, SearchFilters } from '@/entities/product/model/types.ts'
import { filtersToQuery, queryToFilters } from '@/shared/utils/queryParams.ts'

// хук для выполнения фильтрации поиска
export const useSearchResults = () => {
  const route = useRoute()
  const router = useRouter()

  const products = ref<Product[]>([])
  const pagination = ref<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })
  const loading = ref(false)

  // фильтры по умолчанию
  const filters = ref<SearchFilters>({
    query: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'name',
    sortOrder: 'asc',
  })

  let searchTimeout: number
  let isUpdatingFromUrl = false
  let isFirstLoad = true

  // инициализация из URL
  const initFromUrl = () => {
    const { filters: urlFilters, page } = queryToFilters(route.query as Record<string, string>)
    filters.value = { ...filters.value, ...urlFilters }
    pagination.value.page = page
  }

  // обновление URL
  const updateUrl = () => {
    const query = filtersToQuery(filters.value, pagination.value.page)

    // Не обновляем URL если это первая загрузка или если мы только что обновили из URL
    if (isUpdatingFromUrl || isFirstLoad) {
      isUpdatingFromUrl = false
      isFirstLoad = false
      return
    }

    router.push({ query })
  }

  // поиск
  const performSearch = async () => {
    loading.value = true
    try {
      const response = await searchProducts(
        filters.value,
        pagination.value.page,
        pagination.value.pageSize,
      )
      products.value = response.products
      pagination.value = response.pagination
      updateUrl()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: SearchFilters) => {
    filters.value = newFilters
    pagination.value.page = 1 // Сбрасываем на первую страницу при изменении фильтров
  }

  const changePage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      performSearch()
    }
  }

  // Очистка таймеров
  onUnmounted(() => {
    clearTimeout(searchTimeout)
  })

  // Инициализация из URL при первой загрузке
  initFromUrl()

  watch(
    () => route.query,
    () => {
      if (!isFirstLoad) {
        isUpdatingFromUrl = true
        initFromUrl()
        performSearch()
      }
    },
  )

  // дебаунс при изменении фильтров
  watch(
    filters,
    () => {
      if (!isUpdatingFromUrl) {
        clearTimeout(searchTimeout)
        searchTimeout = window.setTimeout(() => {
          performSearch()
        }, 500)
      }
    },
    { deep: true },
  )

  // Первоначальный поиск
  performSearch()
  isFirstLoad = false

  return {
    products,
    pagination,
    loading,
    filters,
    updateFilters,
    changePage,
    performSearch,
  }
}
