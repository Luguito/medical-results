import { LayoutComponent } from '../components/layout/layout';
import { TableComponent } from '../components/table/table';
export const DashboardPage = () => {
    return (
        <>
            <LayoutComponent
                Component={
                    <TableComponent></TableComponent>
                }
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