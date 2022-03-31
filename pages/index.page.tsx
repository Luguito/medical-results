import type { NextPage } from 'next';
import { LoginComponent } from './login/index.page'

export const Home: NextPage = () => {
  return (
    <main style={{ height: '100%' }}>
      <LoginComponent></LoginComponent>
    </main>
  )
}

export default Home
