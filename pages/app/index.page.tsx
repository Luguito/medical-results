import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LayoutComponent } from '../../components/app/components/layout/layout';
import { useLoggedUser } from '../../hooks/useLoggedUser';

export const AppLayoutPage = () => {
    const user = useLoggedUser();
    const router = useRouter();

    useEffect(() => {
        if(user) {
            if (user.permissions.length > 0 && user.role === 'admin') {
                let firstRoute = user.permissions.split(',')[0].trim();
                router.push(`/app/${firstRoute}`);
            } else {
                router.push(`/app/mis-resultados`);
            }
        }
    }, [user]);

    return (
        <>
            <LayoutComponent Component={
                <></>
            }></LayoutComponent>
        </>
    )
}

export default AppLayoutPage;

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  