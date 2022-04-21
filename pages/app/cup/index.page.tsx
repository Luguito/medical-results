import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';


export const CupPage = () => {
    const dummyData = Array(30).fill({'name': 'Fuego', 'cup': 200});

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <FiltersInput fields={['Nombre', 'Código cup']} fn={() => console.log}></FiltersInput>
                        <AdminTable headers={['NOMBRE', 'CÓDIGO CUP', 'ACCIÓN/ACTIVAR']} list={dummyData}></AdminTable>
                    </>
                }
                navInfo={{
                    showButton: false,
                    title: 'Codigo cup',
                    subtitle: 'Activación de codigo cup',
                }}></LayoutComponent>
        </>
    )
}


export default CupPage;