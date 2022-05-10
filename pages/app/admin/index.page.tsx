import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';
import { useEffect, useState } from 'react';
import { Users } from '../api';
import { ModalCreateAdmin } from '../components/modal/modal';
import { IPaginator } from '../interfaces';


export const AdminPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [currentFilter, setCurrentFilter] = useState({});
    const [paginator, setPaginator] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        getAdmins({ page: 1 });
    }, []);

    const getAdmins = async (options?: {}) => {
        let res = await Users.get('getAdmins', {}, { ...currentFilter, ...options });

        setCurrentFilter({ ...options });
        setPaginator(res?.data?.meta);
        setList(res?.data?.items);
    }

    const getValueFilter = (e: any) => isEmpty(e) ? getAdmins({ page: 1 }) : getAdmins(e)

    const getValidPeticion = (e: any) => getValueFilter(Object.fromEntries(Object.entries(e).filter(([_, v]) => v)))

    const isEmpty = (e: {}) => Object.keys(e).length === 0;

    const createFn = () => setModalIsOpen(true);

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <h3 style={{ marginBottom: '8px', color: '#717171'}}>Creacion de Administradores</h3>
                        <AdminTable headers={['NOMBRE', 'CÉDULA', 'PERFIL', 'ACTIVO', 'ACCIÓN/ACTIVAR']} fields={['Nombre']} itemsToShow={['user_fullname', 'user_ccid', 'profile_profileName', 'user_isActive', 'accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion} modal={{
                            name: 'Crear nuevo admin',
                            fn: createFn
                        }}></AdminTable>
                    </>
                }></LayoutComponent>
            <ModalCreateAdmin isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false); getValidPeticion({ page: 1 }) }}></ModalCreateAdmin>
        </>
    )
}


export default AdminPage;