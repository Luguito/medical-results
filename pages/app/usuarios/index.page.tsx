import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';
import { useEffect, useState } from 'react';
import User from '../api/users/users';
import { IPaginator } from '../interfaces';

export const UsersPage = () => {
    const [currentFilter, setCurrentFilter] = useState({});
    const [paginator, setPaginator] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        getPatients({ page: 1 })
    }, []);

    const getPatients = async (options?: {}) => {
        let res = await User.get('getPatients', {}, { ...currentFilter, ...options });

        setCurrentFilter({ ...options });
        setPaginator(res?.data?.meta);
        setList(res?.data?.items);
    }

    const getValueFilter = (e: any) => isEmpty(e) ? getPatients({ page: 1 }) : getPatients(e)

    const getValidPeticion = (e: any) => getValueFilter(Object.fromEntries(Object.entries(e).filter(([_, v]) => v)))

    const isEmpty = (e: {}) => Object.keys(e).length === 0;

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <FiltersInput fields={['Nombre', 'Cedula', 'Correo electronico']} fn={getValidPeticion}></FiltersInput>
                        <AdminTable headers={['NOMBRE', 'CÉDULA', 'CORREO ELECTRÓNICO', 'ACCIÓN/ACTIVAR']} itemsToShow={['fullname', 'ccid', 'email', 'accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion}></AdminTable>
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