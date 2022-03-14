import { categories } from '../elements/categories'
import { useUser } from '@auth0/nextjs-auth0'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function GetCategoryName(id: number) {
  let cat = categories.find(function (post, index) {
    if (post.id == id) return true
  })
  //console.log(cat.name)
  if (!cat) {
    return 'error'
  } else return cat.name
}

const Post = ({ post, refresh }: { post: any; refresh: () => void }) => {
  const router = useRouter()
  const { user } = useUser()
  let categoryname = GetCategoryName(post.category)
  return (
    <div className="p-8 bg-white border rounded-lg shadow-sm border-black/10">
      <a href={`/posts/${post.id}`} className="text-xl font-semibold">
        {post.title}
      </a>
      <p className="text-sm font-medium text-gray-500">{categoryname}</p>
      {post.url && (
        <a
          href={post.url}
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm font-medium text-blue-500 cursor-pointer hover:text-blue-700"
        >
          {post.url}
        </a>
      )}
      <p className="mt-4 text-sm">{post.description}</p>

      <div className="flex flex-row items-center justify-between mt-4">
        <a
          onClick={() => {
            if (!user) return router.push('/api/auth/login')
            fetch('/api/posts/like', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                post: post.id,
                user: user.sub,
              }),
            })
              .then((res) => {
                return res.json()
              })
              .then((json) => {
                console.log(json)
                refresh()
              })
          }}
        >
          <ThumbUpRoundedIcon
            className={classNames(
              user && post.likes?.split(',').includes(user.sub)
                ? 'hover:text-pink:700 text-pink-500'
                : 'text-gray-400 hover:text-gray-600',
              'h-4 w-4 cursor-pointer'
            )}
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${post.title} on AirdropFarmers`
          )}&url=https://www.airdropfarmers.com/posts/${post.id}`}
          className="text-sm font-medium text-gray-400 cursor-pointer hover:text-gray-600"
        >
          Tweet
        </a>
      </div>
    </div>
  )
}
export default Post
