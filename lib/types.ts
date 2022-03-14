export interface Post {
  id: number
  title: string
  url: string
  description: string
  category: number
  likes?: string
}

export interface Category {
  id: number
  name: string
}
