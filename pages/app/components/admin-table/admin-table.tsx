import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './admin-table.styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import { ModalComponent } from '../modal/modal';

export const AdminTable = ({ headers, list }: { headers: string[], list: Array<any> }) => {
    return (
        <>
            <ContainerTable>
                <Table>
                    <thead>
                        <RowTable style={{ position: 'sticky', top: '0', backgroundColor: "#FFF", zIndex: '1' }}>
                            {
                                headers.map((header, key) => {
                                    return (
                                        <HeaderTable key={key}>
                                            {header}
                                        </HeaderTable>
                                    )
                                })
                            }
                        </RowTable>
                    </thead>
                    <tbody>
                        {
                            list.length === 0 ?
                                <RowTable>
                                    <ItemTable colSpan={6}>No hay registros</ItemTable>
                                </RowTable>
                                :
                                list.map((item, index) => {
                                    return (
                                        <RowTable key={index}>
                                            {headers.map((header, index) => {
                                                return (
                                                    <>
                                                        {
                                                            index !== headers.length - 1 ?
                                                                <ItemTable key={index}>Fuego</ItemTable>
                                                                :
                                                                <ItemTable key={index}>
                                                                    {/* <ModalComponent></ModalComponent> */}
                                                                </ItemTable>
                                                        }
                                                    </>
                                                )
                                            })}
                                        </RowTable>
                                    )
                                })
                        }
                    </tbody>
                </Table>
            </ContainerTable>
            <FooterTable>
                <p>Mostrando 1 de 1</p>
                <Stack spacing={2}>
                    <Pagination count={10} shape="rounded" color="primary" />
                </Stack>
            </FooterTable>
        </>
    )
}