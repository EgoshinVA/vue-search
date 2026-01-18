import type { SearchFilters } from '@/entities/product/model/types.ts'

export const filtersToQuery = (filters: SearchFilters, page: number): Record<string, string> => {
  const query: Record<string, string> = {}

  if (filters.query) query.q = filters.query
  if (filters.category) query.category = filters.category
  if (filters.minPrice !== null) query.minPrice = filters.minPrice.toString()
  if (filters.maxPrice !== null) query.maxPrice = filters.maxPrice.toString()
  if (filters.sortBy) query.sortBy = filters.sortBy
  if (filters.sortOrder) query.sortOrder = filters.sortOrder
  query.page = page.toString()

  return query
}

export const queryToFilters = (
  query: Record<string, string>,
): { filters: Partial<SearchFilters>; page: number } => {
  return {
    filters: {
      query: query.q || '',
      category: query.category || '',
      minPrice: query.minPrice ? Number(query.minPrice) : null,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : null,
      sortBy: (query.sortBy as SearchFilters['sortBy']) || 'name',
      sortOrder: (query.sortOrder as SearchFilters['sortOrder']) || 'asc',
    },
    page: query.page ? parseInt(query.page, 10) : 1,
  }
}
