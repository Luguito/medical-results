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
                        <FiltersInput fields={['Nombre']} fn={getValidPeticion}></FiltersInput>
                        <AdminTable headers={['NOMBRE', 'CÉDULA', 'CORREO ELECTRÓNICO', 'ACCIÓN/ACTIVAR']} itemsToShow={['fullname', 'ccid','email', 'accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion}></AdminTable>
                    </>
                }
                navInfo={{
                    showButton: true,
                    title: 'Creación de administradores',
                    subtitle: 'Crea y controla los usuarios administradores',
                    buttonColor: 'grey',
                    buttonText: 'Crear nuevo admin',
                    fn:createFn
                }}></LayoutComponent>
                <ModalCreateAdmin isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}></ModalCreateAdmin>
        </>
    )
}


export default AdminPage;