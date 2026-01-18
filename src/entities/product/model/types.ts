// просто базовые поля для продукта
export type Product = {
  id: number
  name: string
  price: number
  category: string
  description: string
}

// фильтры дял поиска
export type SearchFilters = {
  query: string
  category: string
  minPrice: number | null
  maxPrice: number | null
  sortBy: 'name' | 'price' | 'category'
  sortOrder: 'asc' | 'desc'
}

export type Pagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type SearchResponse = {
  products: Product[]
  pagination: Pagination
}
