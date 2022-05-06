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
                        <h3 style={{ marginBottom: '8px', color: '#717171'}}>Usuarios y Pacientes</h3>
                        <AdminTable headers={['NOMBRE', 'CÉDULA', 'ACTIVO','CORREO ELECTRÓNICO', 'ACCIÓN/ACTIVAR']} fields={['Nombre', 'Cedula', 'Correo electronico']} itemsToShow={['fullname', 'ccid', 'isActive','email', 'accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion}></AdminTable>
                    </>
                }></LayoutComponent>
        </>
    )
}


export default UsersPage;