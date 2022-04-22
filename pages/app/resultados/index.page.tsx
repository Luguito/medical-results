import FilterDate from '../components/filter-date/filter-date';
import { LayoutComponent } from '../components/layout/layout';
import { TableComponent } from '../components/table/table';

export const Results = () => {
    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <FilterDate></FilterDate>
                        <TableComponent></TableComponent>
                    </>
                }
                navInfo={{
                    buttonText: 'Volver al inicio',
                    title: 'Consultar los resultados',
                    subtitle: 'Digita los siguientes filtros para realizar la busqueda de tus resultados',
                    buttonColor: 'grey',
                    showButton: true
                }}></LayoutComponent>
        </>
    )
}


export default Results;