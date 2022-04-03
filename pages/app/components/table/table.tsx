import { useEffect } from 'react';
import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './table.styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ImageIcon from '@mui/icons-material/Image';

export const TableComponent = () => {
    const dummyData = Array(10).fill({})

    useEffect(() => {
        console.log(dummyData)
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
                            dummyData.map((item, index) => {
                                return (
                                    <RowTable key={index}>
                                        <ItemTable>Test #{index}</ItemTable>
                                        <ItemTable>Test #{index}</ItemTable>
                                        <ItemTable>Test #{index}</ItemTable>
                                        <ItemTable>Test #{index}</ItemTable>
                                        <ItemTable>Test #{index}</ItemTable>
                                        <ItemTable>
                                            <ImageIcon></ImageIcon>
                                        </ItemTable>
                                    </RowTable>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </ContainerTable>
            <FooterTable>
                <p>Mostrando 10 de 20</p>
                <Stack spacing={2}>
                    <Pagination count={10} shape="rounded" color="primary" />
                </Stack>
            </FooterTable>
        </>
    )
}

export default TableComponent;