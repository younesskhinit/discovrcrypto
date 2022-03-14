import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import Header from '../app/components/modules/header'
import Rightmargin from 'app/components/modules/right-margin'
import Leftmargin from 'app/components/modules/left-margin'
import { useState } from 'react'
import { useRouter } from 'next/router'

export async function fetchAccessToken(): Promise<string> {
  const tokenRes = await fetch(
    process.env.AUTH0_ISSUER_BASE_URL! + '/oauth/token/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        audience: process.env.AUTH0_ISSUER_BASE_URL! + '/api/v2/',
        grant_type: 'client_credentials',
      }),
    }
  )

  const { access_token } = await tokenRes.json()
  return access_token
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>(
    (router.query.category as string) || 'Recent'
  )

  const [query, setQuery] = useState<string>('')

  return (
    <UserProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Header q={[query, setQuery]} />
        <div className="grid min-h-screen grid-cols-1 pt-8 pb-4 bg-gray-100 md:mt-24 md:grid-cols-4">
          {router.asPath !== '/submissions/new' ? (
            <div className="md:fixed">
              <Leftmargin
                emptyQuery={() => setQuery('')}
                state={[selectedCategory, setSelectedCategory]}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="overflow-y-scroll md:col-start-2 md:col-end-4">
            <Component
              query={query}
              category={selectedCategory}
              {...pageProps}
            />
          </div>
          {router.asPath !== '/submissions/new' ? <Rightmargin /> : <></>}
        </div>
      </div>
    </UserProvider>
  )
}

export default App
