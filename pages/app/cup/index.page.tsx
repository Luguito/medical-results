import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';
import { Cup } from '../api';
import { useEffect, useState } from 'react';
import { ModalLogs } from '../components/modal/modal';


export const CupPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [currentFilter, setCurrentFilter] = useState({});
    const [paginator, setPaginator] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        getPatients({ page: 1 });
    }, []);

    const getPatients = async (options?: {}) => {
        let res = await Cup.get('', {}, { ...currentFilter, ...options });

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
                        <FiltersInput fields={['Nombre', 'Código cup']} fn={getValidPeticion}></FiltersInput>
                        <AdminTable headers={['NOMBRE', 'CÓDIGO CUP', 'ACCIÓN/ACTIVAR']} itemsToShow={['name', 'code', 'accion']} list={list} paginator={paginator} fn={getValidPeticion}></AdminTable>
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