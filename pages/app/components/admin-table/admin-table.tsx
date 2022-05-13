import { ContainerTable, HeaderTable, ItemTable, RowTable, FooterTable, Test } from './admin-table.styled';

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
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { FiltersInput } from '../filters/filters';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const AdminTable = ({ headers, list, paginator, fn, itemsToShow, modal, fields }: { headers: string[], list: Array<any>, paginator: IPaginator, fn: any, itemsToShow: string[], modal?: any, fields?: string[] }) => {
    return (
        <>
            <Test>
                <FiltersInput fields={fields} fn={fn} modal={modal}></FiltersInput>
                <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                    <TableContainer sx={{ maxHeight: 440 }} style={{ border: '1px solid #bcbcbc' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {itemsToShow.map((column, index) => (
                                        <TableCell
                                            key={column}
                                            align={'center'}>
                                            {headers[index]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {itemsToShow.map((column, index) => {
                                                const value = row[column];
                                                return (
                                                    <TableCell key={index} align={'center'}>
                                                        {typeof value === 'boolean' ? <ShowActive value={value} /> : (column === 'accion' ? <RenderMenu item={row} id={row.id} ccid={row.ccid} fn={fn}></RenderMenu> : value)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <FooterTable>
                        <p style={{ fontSize: '0.8rem', color: '#949191' }}>Mostrando {paginator?.itemCount} de {paginator?.totalItems} </p>
                        <Stack spacing={2}>
                            <Pagination count={paginator?.totalPages} shape="rounded" onChange={(e, page) => fn({ page })} />
                        </Stack>
                    </FooterTable>
                </Paper>
            </Test>
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

export const RenderMenu = ({ item, fn, id, ccid }: { item: any, fn: (arg: {}) => void, id: string, ccid: string, }) => {
    const [currentRoute, setRoute] = useState('');

    const Menu = {
        'perfiles': <MenuProfiles ccid={ccid} id={id} item={item} fn={fn}></MenuProfiles>,
        'admin': <MenuAdmin item={item} fn={fn} id={id}></MenuAdmin>,
        'cup': <MenuCup item={item} fn={fn} id={id}></MenuCup>,
        'usuarios': <MenuPatients ccid={ccid} id={id} fn={fn} item={item}></MenuPatients>
    }
    const { asPath } = useRouter();

    useEffect(() => {
        let route = asPath.split('/');
        setRoute(route[route.length - 1]);
    }, []);

    return (
        <>
            {/* @ts-ignore */}
            {Menu[currentRoute]}
        </>
    )
}

export const MenuPatients = ({ ccid, id, fn, item }: { ccid: string, id: string, fn: (arg: {}) => void, item: any }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [modalLogs, setModalLog] = useState<boolean>(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const openAction = () => {
        setModalIsOpen(true);
        handleClose()
    }
    const openLog = () => {
        setModalLog(true)
        handleClose()
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
                <MenuItem onClick={openAction} style={{display: 'flex', justifyContent: 'space-between'}}>
                    Editar
                    <EditIcon style={{fontSize: '0.8rem'}}></EditIcon>
                </MenuItem>
                <MenuItem onClick={openLog} style={{display: 'flex', justifyContent: 'space-between'}}>
                    Ver Logs 
                    <RemoveRedEyeIcon style={{fontSize: '0.8rem', marginLeft: '10px'}}></RemoveRedEyeIcon>
                </MenuItem>
            </Menu>
            <ModalActualizarEmail data={item} isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false); fn({ page: 1 }) }} id={id}></ModalActualizarEmail>
            <ModalLogs isOpen={modalLogs} onClose={() => setModalLog(false)} data={{ url: 'pacientes', logKey: id}}></ModalLogs>
        </>
    )
}

export const MenuProfiles = ({ ccid, id, item, fn }: { ccid: string, id: string, item?: any, fn: (arg: {}) => void }) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    return (
        <>
            <Button onClick={() => setModalIsOpen(true)}>
                <EditIcon></EditIcon>
            </Button>
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

    const openAction = () => {
        setModalIsOpen(true);
        handleClose()
    }
    const openLog = () => {
        setModalLog(true)
        handleClose()
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
                <MenuItem onClick={openAction} style={{display: 'flex', justifyContent: 'space-between'}}>
                    Editar
                    <EditIcon style={{fontSize: '0.8rem'}}></EditIcon>
                </MenuItem>
                <MenuItem onClick={openLog} style={{display: 'flex', justifyContent: 'space-between'}}>
                    Ver Logs 
                    <RemoveRedEyeIcon style={{fontSize: '0.8rem', marginLeft: '10px'}}></RemoveRedEyeIcon>
                </MenuItem>
            </Menu>
            <ModalCreateAdmin isOpen={modalIsOpen} onClose={() => {
                setModalIsOpen(false);
                fn({ page: 1 })
            }} id={id} data={item}></ModalCreateAdmin>
            <ModalLogs isOpen={modalLogs} onClose={() => setModalLog(false)} data={{ url: 'admin', logKey: id}}></ModalLogs>
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
    
    const openAction = () => {
        setModalIsOpen(true);
        handleClose()
    }
    const openLog = () => {
        setModalLog(true)
        handleClose()
    }
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
                <MenuItem onClick={openLog}>Ver logs</MenuItem>
            </Menu>
            <ModalCreateAdmin isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false); fn({ page: 1 }) }} id={id} data={item}></ModalCreateAdmin>
            <ModalLogs isOpen={modalLogs} onClose={() => setModalLog(false)} data={{ url: 'cup', logKey: id}}></ModalLogs>
        </>
    )
}

export const ShowActive = ({ value }: { value: boolean }) => {

    useEffect(() => {
        console.log(value)
    },[])
    
    return (
        <>
            <span style={{ padding: '5px 1.7em', backgroundColor: value ? '#00c868' : '#939191', color: '#FFFFFF', borderRadius: '20px' }}>{value ? "Activo" : "Inactivo"}</span>
        </>
    )
}