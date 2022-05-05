import { LayoutComponent } from '../components/layout/layout';

import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';
import { useEffect, useState } from 'react';
import { Perfiles } from '../api'

import { ModalCreatePerfil } from '../components/modal/modal';
import { IPaginator } from '../interfaces';

export const PerfilesPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [currentFilter, setCurrentFilter] = useState({});
    const [paginator, setPaginator] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        getPatients({ page: 1 });
    }, []);

    const getPatients = async (options?: {}) => {
        let res = await Perfiles.get('profile', {}, {...currentFilter, ...options });

        setCurrentFilter({ ...options });
        setPaginator(res?.data?.meta);
        setList(res?.data?.items);
    }

    const getValueFilter = (e: any) => isEmpty(e) ? getPatients({ page: 1 }) : getPatients(e)

    const getValidPeticion = (e: any) => getValueFilter(Object.fromEntries(Object.entries(e).filter(([_, v]) => v)))

    const isEmpty = (e: {}) => Object.keys(e).length === 0;

    const tesFunction = () => setModalIsOpen(true);

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <FiltersInput fields={['Perfil']} fn={getValidPeticion}></FiltersInput>
                        <AdminTable headers={['PERFIL', 'ACTIVO', 'ACCIÓN/ACTIVAR']} itemsToShow={['profileName', 'isActive', 'accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion}></AdminTable>
                    </>
                }
                navInfo={{
                    title: 'Perfiles',
                    subtitle: 'Listado de perfiles',
                    buttonColor: 'blue',
                    buttonText: 'Agregar nuevo perfil',
                    showButton: true,
                    fn: tesFunction
                }}></LayoutComponent>
            <ModalCreatePerfil isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}></ModalCreatePerfil>
        </>
    )
}


export default PerfilesPage;