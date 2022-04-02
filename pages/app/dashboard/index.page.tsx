import { LayoutComponent } from '../components/layout/layout';

export const DashboardPage = () => {
    return (
        <>
            <LayoutComponent 
            Component={<Test></Test>} 
            navInfo={{
                buttonText: 'Buscar resultados',
                title: 'Tus resultados',
                subtitle: 'Encuentra tus resultados de manera facil',
                buttonColor: 'blue'
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