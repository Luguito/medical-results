import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './admin-table.styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useState } from 'react';

import { ModalActualizarEmail } from '../modal/modal';


export const AdminTable = ({ headers, list, paginator, fn }: { headers: string[], list: Array<any>, paginator: IPaginator, fn: any }) => {
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
                                            <ItemTable>{item.fullname}</ItemTable>
                                            <ItemTable>{item.ccid}</ItemTable>
                                            <ItemTable>{item.email}</ItemTable>
                                            <ItemTable>
                                                <MenuPatients id={item.ccid}></MenuPatients>
                                            </ItemTable>
                                        </RowTable>
                                    )
                                })
                        }
                    </tbody>
                </Table>
            </ContainerTable>
            <FooterTable>
                <p>Mostrando {paginator?.itemCount} de {paginator.totalItems} </p>
                <Stack spacing={2}>
                    <Pagination count={paginator.totalPages} shape="rounded" color="primary" onChange={(e, page) => fn({ page })} />
                </Stack>
            </FooterTable>
        </>
    )
}

interface IPaginator {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export const MenuPatients = ({ id }: { id: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreHorizIcon></MoreHorizIcon>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>Reiniciar contraseña</MenuItem>
                <MenuItem onClick={() => setModalIsOpen(true)}>Actualizar email</MenuItem>
                <MenuItem onClick={handleClose}>Desactivar</MenuItem>
                <MenuItem onClick={handleClose}>Ver logs</MenuItem>
            </Menu>
            <ModalActualizarEmail isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} ccid={id}></ModalActualizarEmail>
        </>
    )
}

