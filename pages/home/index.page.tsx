import { Home } from '../../components/home/component/home';

export const LandingPage = () => {
    return (
        <Home></Home>
    )
}

export default LandingPage

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  