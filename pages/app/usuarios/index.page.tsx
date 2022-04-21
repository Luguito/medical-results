import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';


export const UsersPage = () => {
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
                    showButton: false,
                    title: 'Usuarios / Pacientes',
                    subtitle: 'Control usuarios y envio de solicitudes para cambio de contraseña',
                }}></LayoutComponent>
        </>
    )
}


export default UsersPage;