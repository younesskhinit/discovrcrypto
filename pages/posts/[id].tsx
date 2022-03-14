import { useEffect, useState } from 'react'
import Post from '../../app/components/templates/post'
import { useRouter } from 'next/router'

async function fetchPost(id: string) {
  const posts_res = await fetch(`/api/posts/${id}`)
  const posts = await posts_res.json()
  return posts
}

const Posting = () => {
  const [post, setPost] = useState<any>()
  const [refreshCount, setRefreshCount] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    fetchPost(router.query.id as string).then((res) => setPost(res))
  }, [refreshCount, router.query.id])
  return (
    <div className="mx-4 mt-4 mb-4 md:mt-0 md:mb-0 md:pr-6">
      {post && (
        <Post refresh={() => setRefreshCount(refreshCount + 1)} post={post} />
      )}
    </div>
  )
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query
  const res = await fetch(process.env.API_BASE_URL + `/posts/${id}`)
  const post = await res.json()
  return {
    props: {
      post,
    },
  }
}

export default Posting
