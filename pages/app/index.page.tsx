import { useEffect } from 'react';
import { LayoutComponent } from './components/layout/layout';
import { useRouter } from 'next/router'
export const AppLayoutPage = () => {
    const route = useRouter();

    useEffect(() => {
        route.push('/app/mis-resultados')
    }, [])

    return (
        <>
            <LayoutComponent Component={
                <></>
            }
                navInfo={{
                    buttonText: 'Ir al mis resultados',
                    title: 'Redireccionando al mis resultados...',
                    subtitle: 'En breve se te redireccionara a los resultados',
                    buttonColor: 'blue'
                }}></LayoutComponent>
        </>
    )
}

export default AppLayoutPage;