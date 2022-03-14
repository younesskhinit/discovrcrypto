import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { fetchCategories } from 'app/components/modules/left-margin'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

function newSubmission() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res))
  }, [])

  const { register, handleSubmit } = useForm()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const onSubmit = async (data: any) => {
    const res = await fetch('/api/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        url: data.url || '',
        description: data.description,
        category: data.category,
      }),
    })

    switch (res.status) {
      case 200:
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your submission has been posted.',
        }).then(() => {
          router.push('/')
        })
        break
      default:
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occured.',
        })
        break
    }
  }

  return (
    <form
      className="flex flex-col mx-2 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold">New Post</h1>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="title"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            placeholder="Your title goes here"
            required
            {...register('title', { required: true })}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          URL
        </label>
        <div className="mt-1">
          <input
            type="url"
            id="url"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            placeholder="Your project's URL (optional)"
            {...register('url')}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          A short description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            placeholder="A short description of your project"
            required
            {...register('description', { required: true })}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
          {...register('category')}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="mt-2 inline-flex items-center justify-center rounded bg-pink-200 px-6 py-2.5 font-medium text-pink-500 shadow-sm transition duration-75 ease-in-out hover:bg-pink-300"
        type="submit"
      >
        Create Submission
      </button>
    </form>
  )
}

export default withPageAuthRequired(newSubmission)
