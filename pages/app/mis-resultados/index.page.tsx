import { LayoutComponent } from '../components/layout/layout';
import { TableComponent } from '../components/table/table';

export const MisResultados = () => {
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
                    buttonColor: 'blue',
                    showButton: true
                }}></LayoutComponent>
        </>
    )
}


export default MisResultados;