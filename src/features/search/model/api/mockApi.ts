import type { Product, SearchFilters, SearchResponse } from '@/entities/product/model/types.ts'

// моковые данные для демонстрации работы
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iphone 15',
    price: 90000,
    category: 'electronics',
    description: 'Смартфон Apple',
  },
  {
    id: 2,
    name: 'macbook Air',
    price: 120000,
    category: 'electronics',
    description: 'Ноутбук Apple',
  },
  {
    id: 3,
    name: 'Наушники Sony',
    price: 12000,
    category: 'electronics',
    description: 'Беспроводные наушники',
  },
  {
    id: 4,
    name: 'Apple Watch',
    price: 24000,
    category: 'electronics',
    description: 'Умные часы Apple',
  },
  {
    id: 5,
    name: 'ipad Air',
    price: 50000,
    category: 'electronics',
    description: 'Планшет Apple',
  },
  {
    id: 6,
    name: 'PlayStation 5',
    price: 60000,
    category: 'electronics',
    description: 'Игровая консоль',
  },
  {
    id: 7,
    name: 'Война и мир',
    price: 900,
    category: 'books',
    description: 'Роман Льва Толстого в 4 томах',
  },
  { id: 8, name: '11/22/63', price: 700, category: 'books', description: 'Бестселлер Стивена Кинга' },
  {
    id: 9,
    name: 'Мастер и Маргарита',
    price: 720,
    category: 'books',
    description: 'Роман Михаила Булгакова',
  },
  {
    id: 10,
    name: 'Гарри Поттер',
    price: 950,
    category: 'books',
    description: 'Фэнтези о волшебнике',
  },
  {
    id: 11,
    name: 'Атлант расправил плечи',
    price: 1200,
    category: 'books',
    description: 'Роман-антиутопия Айн Рэнд',
  },
  {
    id: 12,
    name: 'Преступление и наказание',
    price: 580,
    category: 'books',
    description: 'Роман Фёдора Достоевского',
  },

  {
    id: 13,
    name: 'Джинсы',
    price: 4000,
    category: 'clothing',
    description: 'Классические синие джинсы',
  },
  {
    id: 14,
    name: 'Футболка nike',
    price: 2500,
    category: 'clothing',
    description: 'Хлопковая футболка',
  },
  {
    id: 15,
    name: 'Куртка TNF',
    price: 12000,
    category: 'clothing',
    description: 'Тёплая зимняя куртка',
  },
  {
    id: 16,
    name: 'Кроссовки Adidas',
    price: 9000,
    category: 'clothing',
    description: 'Спортивные кроссовки',
  },
  {
    id: 17,
    name: 'Платье Zara',
    price: 4500,
    category: 'clothing',
    description: 'Летнее платье',
  },
  {
    id: 18,
    name: 'Рубашка Hugo Boss',
    price: 6000,
    category: 'clothing',
    description: 'Классическая рубашка',
  },
]

// функция, возвращающая промис с ответом как с сервера
export const searchProducts = async (
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 10,
): Promise<SearchResponse> => {
  // имитировал задержку ответа
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filtered = [...mockProducts]

  // применение фильтров
  if (filters.query) {
    const query = filters.query.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
    )
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category)
  }

  if (filters.minPrice !== null) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== null) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
  }

  // сортировка
  filtered.sort((a, b) => {
    const multiplier = filters.sortOrder === 'asc' ? 1 : -1
    if (filters.sortBy === 'price') {
      return (a.price - b.price) * multiplier
    }
    if (filters.sortBy === 'name') {
      return a.name.localeCompare(b.name) * multiplier
    }
    return a.category.localeCompare(b.category) * multiplier
  })

  // пагинация
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginated = filtered.slice(startIndex, startIndex + pageSize)

  return {
    products: paginated,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  }
}
