import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';


export const AdminPage = () => {
    const dummyData = Array(30).fill({'name': 'Fuego', 'cup': 200});

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <FiltersInput fields={['Nombre', 'Cedula', 'Correo electrónico']} fn={() => console.log}></FiltersInput>
                        <AdminTable headers={['NOMBRE', 'CÉDULA', 'CORREO ELECTRÓNICO', 'ACCIÓN/ACTIVAR']} list={dummyData}></AdminTable>
                    </>
                }
                navInfo={{
                    showButton: true,
                    title: 'Creación de administradores',
                    subtitle: 'Crea y controla los usuarios administradores',
                    buttonColor: 'grey',
                    buttonText: 'Crear nuevo admin'
                }}></LayoutComponent>
        </>
    )
}


export default AdminPage;