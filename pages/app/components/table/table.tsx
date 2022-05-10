import { useEffect, useState } from 'react';
import { FooterTable, Container } from './table.styled';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Api
import { Lab } from '../../api/index';
import { ModalComponent } from '../modal/modal';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

import { FilterDate } from '../filter-date/filter-date';
export const TableComponent = () => {
    const dummyData = Array(10).fill({})
    const [list, setList] = useState({
        data: {
            rows: [],
            totalPage: 0
        }
    });

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [print, setPrint] = useState(false)

    useEffect(() => {
        Lab.get('', {}, { page: 1 }).then(resp => { !resp.message && setList(resp) });
        console.log(list)
    }, [])

    return (
        <>
            <Container>
                <FilterDate></FilterDate>
                <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                    <TableContainer sx={{ maxHeight: 440 }} style={{ border: '1px solid #bcbcbc' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'center'}>
                                        Consecutivo
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        Fecha
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        Codigo Cup
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        Nombre del examen
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        Estado
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        Acción
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list?.data?.rows.map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell align={'center'}>{row?.consecutive}</TableCell>
                                            <TableCell align={'center'}>{new Date(row?.date).toLocaleDateString()}</TableCell>
                                            <TableCell align={'center'}>{row?.cup}</TableCell>
                                            <TableCell align={'center'}>{row?.nomProc}</TableCell>
                                            <TableCell align={'center'}>{Process[row.state as TProcess]}</TableCell>
                                            <TableCell align={'center'}>
                                                <Button onClick={() => setModalIsOpen(true)}>
                                                    <VisibilityIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <FooterTable>
                        {/* <p style={{ fontSize: '0.8rem', color: '#949191' }}>Mostrando {paginator?.itemCount} de {paginator?.totalItems} </p>
                    <Stack spacing={2}>
                        <Pagination count={paginator?.totalPages} shape="rounded" onChange={(e, page) => fn({ page })} />
                    </Stack> */}
                    </FooterTable>
                </Paper>
            </Container>
            <ModalComponent isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}/>
            {/* <ContainerTable>
                <Table>
                    <thead>
                        <RowTable style={{ position: 'sticky', top: '0', backgroundColor: "#FFF" }}>
                            <HeaderTable>CONSECUTIVO</HeaderTable>
                            <HeaderTable>FECHA</HeaderTable>
                            <HeaderTable>CODIGO CUP</HeaderTable>
                            <HeaderTable>NOMBRE DEL EXAMEN</HeaderTable>
                            <HeaderTable>ESTADO DEL EXAMEN</HeaderTable>
                            <HeaderTable>ACCIÓN</HeaderTable>
                        </RowTable>
                    </thead>
                    <tbody>
                        {
                            list.data && list.data['rows'].length == 0 ?
                                <RowTable>
                                    <ItemTable colSpan={6}>No hay registros</ItemTable>
                                </RowTable>
                                :
                                list.data && list.data['rows'].map((item: any, index: number) => {
                                    return (
                                        <RowTable key={index}>
                                            <ItemTable>{item?.consecutive}</ItemTable>
                                            <ItemTable>{item.date}</ItemTable>
                                            <ItemTable>{item.cup}</ItemTable>
                                            <ItemTable>{item.nomProc}</ItemTable>
                                            <ItemTable>{Process[item.state as TProcess]}</ItemTable>
                                            <ItemTable>
                                                <Button onClick={() => setModalIsOpen(true)}>
                                                    <VisibilityIcon/>
                                                </Button>
                                            </ItemTable>
                                        </RowTable>
                                    )
                                })
                        }
                    </tbody>
                </Table>
            </ContainerTable>
            <FooterTable>
                <p>Mostrando 1 de {list.data.totalPage || 1}</p>
                <Stack spacing={2}>
                    <Pagination count={list.data.totalPage || 1} shape="rounded" color="primary" />
                </Stack>
            </FooterTable> */}
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