import { LayoutComponent } from '../../../components/app/components/layout/layout';

import { FiltersInput } from '../../../components/app/components/filters/filters';
import { AdminTable } from '../../../components/app/components/admin-table/admin-table';
import { useEffect, useState } from 'react';
import { Perfiles } from '../../../components/app/api'

import { ModalCreatePerfil } from '../../../components/app/components/modal/modal';
import { IPaginator } from '../../../interfaces';

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

    const openModal = () => setModalIsOpen(true);

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <h3 style={{ marginBottom: '8px', color: '#717171'}}>Perfiles</h3>
                        <AdminTable headers={['PERFIL', 'ACTIVO', 'ACCIÓN/ACTIVAR']} fields={['Perfil']} itemsToShow={['profileName', 'isActive', 'accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion} modal={{
                            name: 'Agregar Perfil',
                            fn: openModal
                        }}></AdminTable>
                    </>
                }></LayoutComponent>
                <ModalCreatePerfil isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false); getValidPeticion({ page: 1 }) }}></ModalCreatePerfil>
        </>
    )
}


export default PerfilesPage;

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  