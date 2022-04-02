import { LayoutComponent } from '../components/layout/layout';

export const DashboardPage = () => {
    return (
        <>
            <LayoutComponent 
            Component={<Test></Test>} 
            navInfo={{
                buttonText: 'Volver al Inicio',
                title: 'Tus resultados',
                subtitle: 'Encuentra tus resultados de manera facil'
            }}></LayoutComponent>
        </>
    )
}


export default DashboardPage;

export const Test = ( ) => {

    return(
        <>
            <h1>Hola</h1>
        </>
    )
}