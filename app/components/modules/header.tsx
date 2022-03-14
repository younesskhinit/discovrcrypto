import { useUser } from '@auth0/nextjs-auth0'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'

const Header = ({ q }: { q: [string, Dispatch<SetStateAction<string>>] }) => {
  const { user } = useUser()
  const router = useRouter()

  const [textQuery, setTextQuery] = q

  return (
    <div className="top-0 flex flex-col items-center w-screen px-8 py-6 space-y-4 bg-white border-b shadow border-black/10 md:fixed md:h-24 md:flex-row md:justify-between md:space-y-0">
      <a href="/">
        <img className="object-scale-down w-auto h-12" src="/img/logo.png" />
      </a>
      {(router.asPath === '/' || router.asPath === '/posts') && (
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Search..."
          className="px-5 py-3 mt-2 text-black rounded-md border-black/10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm md:w-1/3"
          value={textQuery}
          onChange={(e) => {
            setTextQuery(e.currentTarget.value)
          }}
        />
      )}
      <div className="flex flex-col items-center space-x-0 md:flex-row md:space-x-4">
        {user && (
          <p className="text-sm text-gray-400">
            Logged in as{' '}
            <span className="font-medium text-black">{user.nickname}</span>
          </p>
        )}
        <a
          href={user ? '/api/auth/logout' : '/api/auth/login'}
          className="mt-2 inline-flex items-center justify-center rounded bg-pink-200 px-6 py-2.5 font-medium text-pink-500 shadow-sm transition duration-75 ease-in-out hover:bg-pink-300 md:mt-0"
        >
          {user ? 'Sign out' : 'Sign in'}
        </a>
      </div>
    </div>
  )
}

export default Header
