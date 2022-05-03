import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './admin-table.styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useEffect, useState } from 'react';

import { ModalActualizarEmail, ModalCreateAdmin, ModalCreatePerfil } from '../modal/modal';

import { Auth } from '@api'
import { useRouter } from 'next/router';
import { Cup, Perfiles, Users } from 'pages/app/api';

import { ModalLogs } from '../modal/modal'

export const AdminTable = ({ headers, list, paginator, fn, itemsToShow }: { headers: string[], list: Array<any>, paginator: IPaginator, fn: any, itemsToShow: string[] }) => {
    const { asPath } = useRouter();
    useEffect(() => {
        console.log(asPath)
    }, [])
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
                                            {itemsToShow.map((field, index) => {
                                                return (
                                                    index !== itemsToShow.length - 1 ?
                                                        <ItemTable key={index}>{item[field]}</ItemTable>
                                                        :
                                                        <ItemTable key={index}>
                                                            <MenuCup fn={fn} id={item.id} item={item}></MenuCup>
                                                        </ItemTable>
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

export const MenuPatients = ({ ccid, id }: { ccid: string, id: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [modalLogs, setModalLog] = useState<boolean>(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleReset = async () => {
        await Auth.get(`resend-recovery-password/${ccid}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

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
                <MenuItem onClick={handleReset}>Reiniciar contraseña</MenuItem>
                <MenuItem onClick={() => setModalIsOpen(true)}>Actualizar email</MenuItem>
                <MenuItem onClick={handleClose}>Desactivar</MenuItem>
                <MenuItem onClick={() => setModalLog(true)}>Ver logs</MenuItem>
            </Menu>
            <ModalActualizarEmail isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} id={id}></ModalActualizarEmail>
            <ModalLogs isOpen={modalLogs} onClose={() => setModalLog(false)} data={{ url: 'perfiles' }}></ModalLogs>
        </>
    )
}

export const MenuProfiles = ({ ccid, id, item, fn }: { ccid: string, id: string, item?: any, fn: (arg: {}) => void }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const switchActive = async () => await Perfiles.put(`profile/${item.id}`, { isActive: !item.isActive ? true : false }, {}).then(() => fn({ page: 1 }))

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
                <MenuItem onClick={() => setModalIsOpen(true)}>Editar</MenuItem>
                <MenuItem onClick={switchActive}>{(item.isActive ? 'Desactivar' : 'Activar') + ' perfil'}</MenuItem>
            </Menu>
            <ModalCreatePerfil isOpen={modalIsOpen} onClose={() => {
                setModalIsOpen(false);
                fn({ page: 1 })
            }} id={id} data={item}></ModalCreatePerfil>
        </>
    )
}

export const MenuAdmin = ({ item, fn, id }: { item?: any, fn: (arg: {}) => void, id: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [modalLogs, setModalLog] = useState<boolean>(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const switchActive = async () => await Users.put(`${item.id}`, { isActive: !item.isActive ? true : false }, {}).then(() => fn({ page: 1 }))
    const deleteAdmin = async () => await Users.remove(`${item.id}`, {}, {});
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
                <MenuItem onClick={() => setModalIsOpen(true)}>Editar</MenuItem>
                <MenuItem onClick={switchActive}>{(item.isActive ? 'Desactivar' : 'Activar') + ' perfil'}</MenuItem>
                <MenuItem onClick={deleteAdmin}>Eliminar</MenuItem>
                <MenuItem onClick={() => setModalLog(true)}>Ver Logs</MenuItem>
            </Menu>
            <ModalCreateAdmin isOpen={modalIsOpen} onClose={() => {
                setModalIsOpen(false);
                fn({ page: 1 })
            }} id={id} data={item}></ModalCreateAdmin>
            <ModalLogs isOpen={modalLogs} onClose={() => setModalLog(false)} data={{ url: 'perfiles' }}></ModalLogs>
        </>
    )
}

export const MenuCup = ({ item, fn, id }: { item?: any, fn: (arg: {}) => void, id: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [modalLogs, setModalLog] = useState<boolean>(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const switchActive = async () => await Cup.put(`${item.id}`, { isActive: !item.isActive ? true : false }, {}).then(() => fn({ page: 1 }))
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
                <MenuItem onClick={switchActive}>{(item.isActive ? 'Desactivar' : 'Activar') + ' Codigo CUP'}</MenuItem>
                <MenuItem onClick={() => setModalLog(true)}>Ver logs</MenuItem>
            </Menu>
            <ModalCreateAdmin isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false); fn({ page: 1 }) }} id={id} data={item}></ModalCreateAdmin>
            <ModalLogs isOpen={modalLogs} onClose={() => setModalLog(false)} data={{ url: 'cup' }}></ModalLogs>
        </>
    )
}