export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category?: string
  calories?: number
}

export function buildMenuMap(items: MenuItem[]): Map<string, MenuItem> {
  return new Map(items.map((item) => [item.id, item]))
}
