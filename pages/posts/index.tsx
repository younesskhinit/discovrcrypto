import { SortByRecent } from 'app/components/elements/sorting'
import Post from 'app/components/templates/post'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { SortByLikes } from 'app/components/elements/sorting'

async function fetchPosts(category: string, query: string) {
  if (query) {
    const query_posts_res = await fetch(
      `/api/search/${encodeURIComponent(query)}`
    )
    const query_posts = await query_posts_res.json()
    return query_posts
  }

  switch (category) {
    case 'Recent':
      const recent_posts_res = await fetch(`/api/posts`)
      const recent_posts = await recent_posts_res.json()
      return recent_posts
    case 'Most Liked':
      const liked_posts_res = await fetch(`/api/posts`)
      const liked_posts = await liked_posts_res.json()
      return SortByLikes(liked_posts)
    default:
      const posts_res = await fetch(
        `/api/posts?category=${encodeURIComponent(category)}`
      )
      const posts = await posts_res.json()
      return posts
  }
}

const Posts = ({ category, query }: { category: string; query: string }) => {
  const { isLoading, user } = useUser()
  const [posts, setPosts] = useState<any[]>([])
  const [refreshCount, setRefreshCount] = useState<number>(0)

  useEffect(() => {
    fetchPosts(category, query).then((res) => {
      setPosts(res)
      console.log(res)
    })
  }, [category, refreshCount, query])

  return (
    <div>
      <div className="grid gap-4 mx-2 mt-8 mb-10 md:mx-10 md:mt-0">
        {posts.map((post) => (
          <Post
            refresh={() => setRefreshCount(refreshCount + 1)}
            post={post}
            key={post.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Posts
