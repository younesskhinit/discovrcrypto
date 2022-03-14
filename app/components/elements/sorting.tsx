export function SortByRecent(posts: any[]) {
  posts.sort(function (x, y) {
    return y.id - x.id
  })
  return posts
}
export function SortByLikes(posts: any[]) {
  posts.sort(function (x, y) {
    return y.likes.split(',').length - x.likes.split(',').length
  })
  return posts
}
