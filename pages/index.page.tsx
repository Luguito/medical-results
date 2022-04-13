import type { NextPage } from 'next';
import { LoginPage } from './login/index.page'

export const Home: NextPage = () => {
  return (
    <main style={{ height: '100%' }}>
      <LoginPage></LoginPage>
    </main>
  )
}

export default Home
