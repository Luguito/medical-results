import { LayoutComponent } from '../components/layout/layout';
import { TableComponent } from '../components/table/table';

export const MisResultados = () => {
    return (
        <>
            <LayoutComponent
                Component={
                    <TableComponent></TableComponent>
                }></LayoutComponent>
        </>
    )
}


export default MisResultados;