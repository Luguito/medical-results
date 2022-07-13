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

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
