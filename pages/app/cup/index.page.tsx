import { LayoutComponent } from '../components/layout/layout';
import { FiltersInput } from '../components/filters/filters';
import { AdminTable } from '../components/admin-table/admin-table';
import { Cup } from '../api';
import { useEffect, useState } from 'react';
import { ModalLogs } from '../components/modal/modal';
import { IPaginator } from '../interfaces';


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
                        <h3 style={{ marginBottom: '8px', color: '#717171'}}>Codigos Cup</h3>
                        <AdminTable headers={['NOMBRE', 'CÓDIGO CUP', 'ACTIVO','ACCIÓN/ACTIVAR']} fields={['Nombre', 'Código cup']} itemsToShow={['name', 'code', 'isActive','accion']} list={list} paginator={paginator as IPaginator} fn={getValidPeticion}></AdminTable>
                    </>
                }></LayoutComponent>
        </>
    )
}


export default CupPage;