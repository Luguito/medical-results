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
import HistoryIcon from '@mui/icons-material/History';

import { PrimaryBlueColor } from '@global-colors';
import { IOSSwitch } from '../custom-switch/switch';
import { Auth } from '@api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
const MySwal = withReactContent(Swal)

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
                        <div style={{ marginBottom: '1em' }}>
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
    const [email, setEmail] = useState({});

    useEffect(() => {
        setEmail({
            email: data?.email,
            isActive: data?.isActive
        });
    }, [data]);

    const handleClose = () => onClose();

    const handleReset = async () => await Users.put(id as string, email, {}).then(() => {
        onClose();
        MySwal.fire("Usuario Editado", '', 'success')
    });

    const onChange = (e: any) => setEmail({ email: e.target.value });

    const onChangeCheckBox = (e: any, type: string) => setEmail({ ...email, [type]: e.target.checked });

    const handleResetEmail = async () => {
        await Auth.get(`resend-recovery-password/${data?.ccid}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        onClose();
        MySwal.fire("Recuperar contraseña", "Se ha enviado el correo de recuperación de contraseña", 'success')
    }

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
                            Editar informacion de usuarios
                        </Typography>
                        <CloseIcon style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={handleClose} />
                    </HeaderModal>
                    <CenterUpdated>
                        <p>Nuevo correo electronico</p>
                        {/* @ts-ignore */}
                        <TextField onChange={onChange} value={email?.email}></TextField>
                    </CenterUpdated>
                    <CenterUpdated>
                        <p>Estado</p>
                        {/* @ts-ignore */}
                        <CustomSwitch onChange={(e) => onChangeCheckBox(e, 'isActive')} checked={email['isActive']} sx={{ color: 'green' }} />
                    </CenterUpdated>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <OutlineButton variant="outlined" onClick={handleResetEmail} style={{ marginTop: '2em' }} startIcon={<HistoryIcon />}>
                            Reestablecer Contraseña
                        </OutlineButton>
                        <FullButton onClick={handleReset} style={{ marginTop: '2em' }}>Actualizar</FullButton>
                    </div>
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
        data?.permisions.split(',').map((p: string) => {
            permissions.add(p.trim())
            setPermission(permissions)
        })
        setForm({
            profileName: data?.profileName,
            permisions: data?.permisions,
            isActive: data?.isActive
        });
    }, [data]);

    const handleClose = () => onClose();

    const handleCreate = async () => await Perfiles.post('profile', form, {}).then(() => {
        onClose();
        MySwal.fire("Perfil Creado", '', 'success')
    });

    const handleEdit = async () => await Perfiles.put(`profile/${data.id}`, form, {}).then(() => {
        onClose();
        MySwal.fire("Perfil Editado", '', 'success')
    });

    const onChangeCheckbox = (e: any) => {
        let name: string = e.target.name;

        let exist = permissions.has(name);

        if (!exist) {
            permissions.add(name)
        } else {
            permissions.delete(name);
        }

        setForm({ ...form, 'permisions': Array.from(permissions).join(',') });
    }

    const onChange = (e: any, type: string) => setForm({ ...form, [type]: e.target.value });
    const onChangeSwitch = (e: any, type: string) => setForm({ ...form, [type]: e.target.checked });

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
                                <IOSSwitch onChange={(e) => onChangeSwitch(e, 'isActive')} checked={form['isActive']} sx={{ color: 'green' }} />
                            </CenterUpdated>
                        </div>
                    }
                    <CenterUpdated>
                        <p>Permisos</p>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={form?.permisions?.split(',').includes('dashboard')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Dashboard" name="dashboard" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={form?.permisions?.split(',').includes('perfiles')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Perfiles" name="perfiles" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={form?.permisions?.split(',').includes('cup')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Codigos Cup" name="cup" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={form?.permisions?.split(',').includes('usuarios')} sx={{
                                color: PrimaryBlueColor,
                                '&.Mui-checked': {
                                    color: PrimaryBlueColor,
                                },
                            }} />} label="Usuarios" name="usuarios" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={form?.permisions?.split(',').includes('admin')} sx={{
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
            profile_id: profileName?.id,
            isActive: data?.user_isActive
        })
    }, [data])

    const handleClose = () => onClose();

    const getProfiles = async () => await Perfiles.get('profile', {}, { active: true }).then((v) => setProfile(v.data.items)).then(() => onClose());

    const handleCreate = async () => await Users.post('create-admin', form, {}).then(() => {
        setForm({});
        onClose();
        MySwal.fire("Usuario admin creado", '', 'success');
    }).catch((e) => MySwal.fire("Error", e.message, 'error'))

    const handleEdit = async () => await Users.put(`${data.user_id}`, form, {}).then(() => {
        onClose();
        MySwal.fire("Usuario Editado", '', 'success')
    });

    const deleteAdmin = async () => MySwal.fire({
        title: 'Eliminar usuario admin',
        text: 'Estas seguro de que quieres eliminar este usuario?',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#33bfcd',
        reverseButtons: true,
        customClass: {
            container: 'sweet-alert-custom',
        }
    }).then(async (prop) => {
        if (prop.isConfirmed) {
            await Users.remove(`${data?.user_id}`, {}, {})
            onClose();
            MySwal.fire("Usuario Eliminado", '', 'success')
        }
    });
    const onChange = (e: any, type: string) => setForm({ ...form, [type]: e.target.value });

    const onChangeCheckBox = (e: any, type: string) => setForm({ ...form, [type]: e.target.checked });

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
                            {(data ? 'Editar' : 'Crear') + ' usuario admin'}
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
                        <CenterUpdated style={{ justifyContent: 'flex-start' }}>
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
                                    <IOSSwitch onChange={(e) => onChangeCheckBox(e, 'isActive')} checked={form['isActive']} sx={{ color: 'green' }} />
                                </CenterUpdated>
                            }
                        </CenterUpdated>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <OutlineButton variant="outlined" onClick={deleteAdmin} style={{ marginTop: '2em' }}>
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
                        <Logs url={data.url} logKey={data.logKey}></Logs>
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