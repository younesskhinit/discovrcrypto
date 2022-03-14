import { useUser } from '@auth0/nextjs-auth0'

const Rightmargin = () => {
  const { user, isLoading } = useUser()

  return (
    <div className="ml-4 mr-4 md:ml-0">
      <div className="p-8 bg-white border rounded-lg shadow-sm border-black/10">
        <h1 className="text-xl font-semibold text-black">Add Your Link</h1>
        <p className="text-sm font-medium text-gray-500">
          Submit your link now to appear on the front page and in our
          newsletter!
        </p>
        <a
          href={!user && !isLoading ? '/api/auth/login' : '/submissions/new'}
          className="mt-2 inline-flex items-center justify-center rounded bg-pink-200 px-6 py-2.5 font-medium text-pink-500 shadow-sm transition duration-75 ease-in-out hover:bg-pink-300"
        >
          Create Post
        </a>
      </div>
    </div>
  )
}
export default Rightmargin
