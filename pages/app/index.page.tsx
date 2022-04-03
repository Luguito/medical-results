import { useEffect } from 'react';
import { LayoutComponent } from './components/layout/layout';
import { useRouter } from 'next/router'
export const AppLayoutPage = () => {
    const route = useRouter();

    useEffect(() => {
        route.push('/app/dashboard')
    }, [])

    return (
        <>
            <LayoutComponent Component={
                <></>
            }
                navInfo={{
                    buttonText: 'Ir al dashboard',
                    title: 'Redireccionando al dashboard...',
                    subtitle: 'En breve se te redireccionara al dashboard',
                    buttonColor: 'blue'
                }}></LayoutComponent>
        </>
    )
}

export default AppLayoutPage;