import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export async function fetchCategories() {
  const categories_res = await fetch(`/api/categories`)
  const categories = await categories_res.json()

  return categories
}

const Leftmargin = ({
  state,
  emptyQuery,
}: {
  state: [string, Dispatch<SetStateAction<string>>]
  emptyQuery: () => void
}) => {
  const [categories, setCategories] = useState<any[]>([])
  const router = useRouter()

  const [category, setCategory] = state
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (router.asPath !== '/' && router.asPath !== '/posts') router.push('/')
    setCategory(e.currentTarget.id)
    emptyQuery()
  }

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res))
  }, [])

  return (
    <div className="ml-4 mr-4 md:mr-0 md:w-48 lg:w-64">
      <div className="grid grid-cols-1">
        <button
          onClick={handleClick}
          id="Recent"
          className="inline-flex items-center w-full px-4 py-2 text-left text-gray-700 transition duration-75 bg-transparent rounded hover:bg-gray-200 hover:text-black"
        >
          Recent
        </button>
        {/* <button
          onClick={handleClick}
          id="Most Liked"
          className="inline-flex items-center w-full px-4 py-2 text-left text-gray-700 transition duration-75 bg-transparent rounded hover:bg-gray-200 hover:text-black"
        >
          Most Liked
        </button> */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={handleClick}
            id={String(category.id)}
            className="inline-flex items-center w-full px-4 py-2 text-left text-gray-700 transition duration-75 bg-transparent rounded hover:bg-gray-200 hover:text-black"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Leftmargin
