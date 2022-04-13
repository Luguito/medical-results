import { useEffect, useState } from 'react';
import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './table.styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ImageIcon from '@mui/icons-material/Image';

// Api
import { Lab } from '../../api/index';
import Modal from '../modal/modal';

export const TableComponent = () => {
    const dummyData = Array(10).fill({})
    const [list, setList] = useState({
        data: {
            rows: [],
            totalPage: 0
        }
    });

    useEffect(() => {
        Lab.get('', {}, { page: 1 }).then(resp => { setList(resp) });
    }, [])

    return (
        <>
            <ContainerTable>
                <Table>
                    <thead>
                        <RowTable style={{ position: 'sticky', top: '0', backgroundColor: "#FFF" }}>
                            <HeaderTable>Consecutivo</HeaderTable>
                            <HeaderTable>Fecha</HeaderTable>
                            <HeaderTable>Código CUP</HeaderTable>
                            <HeaderTable>Nombre del examen</HeaderTable>
                            <HeaderTable>Estado del examen</HeaderTable>
                            <HeaderTable>Acción</HeaderTable>
                        </RowTable>
                    </thead>
                    <tbody>
                        {
                            list.data && list.data['rows'].map((item: any, index: number) => {
                                return (
                                    <RowTable key={index}>
                                        <ItemTable>{item?.consecutive}</ItemTable>
                                        <ItemTable>{item.date}</ItemTable>
                                        <ItemTable>{item.cup}</ItemTable>
                                        <ItemTable>{item.nomProc}</ItemTable>
                                        <ItemTable>{Process[item.state as TProcess]}</ItemTable>
                                        <ItemTable>
                                            <Modal></Modal>
                                        </ItemTable>
                                    </RowTable>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </ContainerTable>
            <FooterTable>
                <p>Mostrando 1 de {list.data.totalPage}</p>
                <Stack spacing={2}>
                    <Pagination count={list.data.totalPage} shape="rounded" color="primary" />
                </Stack>
            </FooterTable>
        </>
    )
}

export default TableComponent;

export type TProcess = 'O' | 'E' | 'A' | 'I' | 'N' | 'X';
export const Process: Record<TProcess, string> = {
    'O': 'ORDENADO',
    'E': 'EN PROCESO',
    'A': 'APLICADO',
    'I': 'INTERPRETADO',
    'N': 'ANULADO',
    'X': 'RESULTADO EXTERNO',
}