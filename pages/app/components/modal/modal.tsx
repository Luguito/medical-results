import { useState, FC, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useReactToPrint } from 'react-to-print';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

// Styled Components
import { HeaderModal, OutlineButton, FullButton, ContainerPDF, CenterUpdated, CustomSwitch } from './modal.styled';
import { ResultTemplate } from '../result-template'
import { Results, Users, Perfiles } from '../../api';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Logs from '../logs/logs';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import { PrimaryBlueColor } from '@global-colors';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface IModal {
    title?: string;
    ccid?: string;
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    data?: any
}

export const ModalComponent: FC<IModal> = (props) => {
    const { onClose, isOpen } = props
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleClose = () => {
        onClose()
    }


    const sendEmail = () => {
        Results.get('send-email', {}).then(v => console.log(v));
    }

    return (
        <div>
            <Modal open={isOpen} onClose={handleClose} id="printModal">
                <Box sx={style}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            Resultado de laboratorio
                        </Typography>
                        <div>
                            <OutlineButton onClick={sendEmail}>Enviar por Correo</OutlineButton>
                            <FullButton onClick={handlePrint}>Descargar PDF</FullButton>
                        </div>
                    </HeaderModal>
                    <ContainerPDF>
                        {props.children}
                        <div ref={componentRef}>
                            <ResultTemplate data={''} print={() => { }}></ResultTemplate>
                        </div>
                    </ContainerPDF>
                </Box>
            </Modal>

        </div>
    );
}

export const ModalActualizarEmail = (props: IModal) => {
    const { onClose, isOpen, id, data } = props
    const [email, setEmail] = useState();

    useEffect(() => {
        setEmail(data?.email);
    }, [data]);

    const handleClose = () => onClose();

    const handleReset = async () => await Users.put(id as string, { 'email': email }, {}).then(() => onClose());

    const onChange = (e: any) => setEmail(e.target.value);

    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    height: 250,
                    width: 300,
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            Actualizar Email
                        </Typography>
                    </HeaderModal>
                    <CenterUpdated>
                        <p>Email</p>
                        <TextField onChange={onChange} value={email}></TextField>
                        <FullButton onClick={handleReset} style={{ marginTop: '2em' }}>Enviar</FullButton>
                    </CenterUpdated>
                </Box>
            </Modal>
        </div>
    )
}

export const ModalCreatePerfil: FC<IModal> = (props) => {
    const { onClose, isOpen, data } = props;
    const [form, setForm] = useState<Partial<IForm>>({});
    const [permissions, setPermission] = useState<Set<string>>(new Set());

    useEffect(() => {
        setForm({
            profileName: data?.profileName,
            permisions: data?.permisions,
            isActive: data?.isActive
        });
    }, [data]);

    const handleClose = () => onClose();

    const handleCreate = async () => await Perfiles.post('profile', form, {}).then(() => onClose());

    const handleEdit = async () => await Perfiles.put(`profile/${data.id}`, form, {}).then(() => onClose());

    const onChangeCheckbox = (e: any) => {
        let name: string = e.target.name;

        let exist = permissions.has(name);

        if (!exist) {
            permissions.add(name)
        } else {
            permissions.delete(name);
        }

        console.log(Array.from(permissions))
        setForm({ ...form, 'permisions': Array.from(permissions).join(',') });
    }

    const onChange = (e: any, type: string) => setForm({ ...form, [type]: e.target.value });

    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    width: 400,
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            {(data ? 'Editar' : 'Crear') + ' perfil'}
                        </Typography>
                        <CloseIcon style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={handleClose} />
                    </HeaderModal>
                    {!data ?
                        <CenterUpdated>
                            <p>Perfil</p>
                            <TextField onChange={(e) => onChange(e, 'profileName')} value={form['profileName']}></TextField>
                        </CenterUpdated>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <CenterUpdated>
                                <p>Perfil</p>
                                <TextField onChange={(e) => onChange(e, 'profileName')} value={form['profileName']}></TextField>
                            </CenterUpdated>
                            <CenterUpdated>
                                <p>Estado</p>
                                <CustomSwitch onChange={(e) => onChange(e, 'isActive')} checked={form['isActive']} sx={{ color: 'green' }} />
                            </CenterUpdated>
                        </div>
                    }
                    <CenterUpdated>
                        <p>Permisos</p>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={data?.permisions?.split(',').includes('dashboard')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Dashboard" name="dashboard" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permisions?.split(',').includes('perfiles')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Perfiles" name="perfiles" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permisions?.split(',').includes('cup')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Codigos Cup" name="cup" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permisions?.split(',').includes('usuarios')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Usuarios" name="usuarios" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permisions?.split(',').includes('admin')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Admin" name="admin" onChange={onChangeCheckbox} />
                        </FormGroup>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <OutlineButton variant="outlined" onClick={handleClose} style={{ marginTop: '2em' }}>Cancelar</OutlineButton>
                            <FullButton onClick={!data ? handleCreate : handleEdit} style={{ marginTop: '2em' }}>{!data ? "Agregar" : "Confirmar"}</FullButton>
                        </div>
                    </CenterUpdated>
                </Box>
            </Modal>
        </div>
    )
}

export const ModalCreateAdmin: FC<IModal> = (props) => {
    const { onClose, isOpen, data } = props;
    const [profile, setProfile] = useState<Partial<Array<Object>>>([])
    const [form, setForm] = useState<Partial<IForm>>({});

    useEffect(() => {
        getProfiles();
    }, []);

    useEffect(() => {
        let profileName: any = profile && profile.find((p: any) => p['id'] === data?.user_profile_id)

        setForm({
            fullname: data?.user_fullname,
            lastname: data?.user_lastname,
            ccid: data?.user_ccid,
            profile_id: profileName?.id
        })
    }, [data])

    const handleClose = () => onClose();

    const getProfiles = async () => await Perfiles.get('profile', {}, { active: true }).then((v) => setProfile(v.data.items)).then(() => onClose());

    const handleCreate = async () => await Users.post('create-admin', form, {}).then(() => onClose());

    const handleEdit = async () => await Users.put(`${data.user_id}`, form, {}).then(() => onClose());

    const onChange = (e: any, type: string) => setForm({ ...form, [type]: e.target.value });

    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    width: 500,
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            {(data ? 'Editar' : 'Crear') + ' Admin'}
                        </Typography>
                        <CloseIcon style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={handleClose} />
                    </HeaderModal>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
                        <CenterUpdated>
                            <CenterUpdated>
                                <p>Nombre</p>
                                <TextField onChange={(e) => onChange(e, 'fullname')} value={form?.fullname}></TextField>
                            </CenterUpdated>
                            <CenterUpdated>
                                <p>Cedula</p>
                                <TextField onChange={(e) => onChange(e, 'ccid')} value={form?.ccid}></TextField>
                            </CenterUpdated>
                            <CenterUpdated>
                                <p>Contraseña</p>
                                <TextField onChange={(e) => onChange(e, 'password')}></TextField>
                            </CenterUpdated>
                        </CenterUpdated>
                        <CenterUpdated style={{ justifyContent: 'none' }}>
                            <CenterUpdated>
                                <p>Apellido</p>
                                <TextField onChange={(e) => onChange(e, 'lastname')} value={form?.lastname}></TextField>
                            </CenterUpdated>
                            <CenterUpdated>
                                <FormControl fullWidth style={{ marginTop: '3em' }}>
                                    <InputLabel id="demo-simple-select-label">Profile</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={form?.profile_id}
                                        label="Perfiles"
                                        onChange={(e) => onChange(e, 'profile_id')}
                                    >
                                        {profile.length > 0 && profile.map((item: any, index) => {
                                            return (
                                                <MenuItem value={item['id']} key={index}>{item['profileName']}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </CenterUpdated>
                            {!data ?
                                null
                                :
                                <CenterUpdated>
                                    <p>Estado</p>
                                    <CustomSwitch />
                                </CenterUpdated>
                            }
                        </CenterUpdated>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <OutlineButton variant="outlined" onClick={handleClose} style={{ marginTop: '2em' }}>
                            <DeleteOutlineIcon />
                        </OutlineButton>
                        <FullButton onClick={!data ? handleCreate : handleEdit} style={{ marginTop: '2em' }}>{!data ? "Agregar" : "Confirmar"}</FullButton>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export const ModalLogs: FC<IModal> = (props) => {
    const { onClose, isOpen, data } = props;

    const handleClose = () => onClose();
    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    width: 700,
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            Logs
                        </Typography>
                    </HeaderModal>
                    <CenterUpdated>
                        <Logs url={data.url}></Logs>
                    </CenterUpdated>
                </Box>
            </Modal>
        </div>
    )
}


export interface IForm {
    profileName: string
    permisions: string
    fullname: string,
    lastname: string
    ccid: string
    profile_id: number
    isActive: boolean
}