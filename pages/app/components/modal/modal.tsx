import { useState, FC, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useReactToPrint } from 'react-to-print';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

// Styled Components
import { HeaderModal, OutlineButton, FullButton, ContainerPDF, CenterUpdated } from './modal.styled';
import { ResultTemplate } from '../result-template'
import { Results, Users, Perfiles } from '../../api';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Logs from '../logs/logs';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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
    const { onClose, isOpen, id } = props
    const [email, setEmail] = useState();
    const handleClose = () => onClose();

    const handleReset = async () => await Users.put(id as string, { 'email': email }, {});

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
                        <TextField onChange={onChange}></TextField>
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
            permisions: data?.permisions
        });
    }, [data]);

    const handleClose = () => onClose();

    const handleCreate = async () => await Perfiles.post('profile', form, {});

    const handleEdit = async () => await Perfiles.put(`profile/${data.id}`, form, {})

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
                    </HeaderModal>
                    <CenterUpdated>
                        <p>Perfil</p>
                        <TextField onChange={(e) => onChange(e, 'profileName')} value={form['profileName']}></TextField>
                    </CenterUpdated>
                    <CenterUpdated>
                        <p>Permisos</p>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('dashboard')} />} label="Dashboard" name="dashboard" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('perfiles')} />} label="Perfiles" name="perfiles" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('cup')} />} label="Codigos Cup" name="cup" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('pacientes')} />} label="Usuarios" name="pacientes" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('admin')} />} label="Admin" name="admin" onChange={onChangeCheckbox} />
                        </FormGroup>
                        <FullButton onClick={!data ? handleCreate : handleEdit} style={{ marginTop: '2em' }}>Enviar</FullButton>
                    </CenterUpdated>
                </Box>
            </Modal>
        </div>
    )
}

export const ModalCreateAdmin: FC<IModal> = (props) => {
    const { onClose, isOpen, data } = props;
    const [profile, setProfile] = useState([])
    const [form, setForm] = useState<Partial<IForm>>({});

    useEffect(() => {
        getProfiles();
        console.log(profile)
    }, []);

    const handleClose = () => onClose();

    const getProfiles = async () => await Perfiles.get('profile', {}, {}).then((v) => setProfile(v.data.items));

    const handleCreate = async () => await Users.post('create-admin', form, {});

    const handleEdit = async () => await Users.put(`${data.id}`, form, {});

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
                            {(data ? 'Editar' : 'Crear') + ' Admin'}
                        </Typography>
                    </HeaderModal>
                    <CenterUpdated>
                        <p>Nombre</p>
                        <TextField onChange={(e) => onChange(e, 'fullname')}></TextField>
                    </CenterUpdated>
                    <CenterUpdated>
                        <p>Apellido</p>
                        <TextField onChange={(e) => onChange(e, 'lastname')}></TextField>
                    </CenterUpdated>
                    <CenterUpdated>
                        <p>Cedula</p>
                        <TextField onChange={(e) => onChange(e, 'ccid')}></TextField>
                    </CenterUpdated>
                    <CenterUpdated>
                        <InputLabel id="demo-simple-select-label">Perfil</InputLabel>
                        <Select
                            value={form.profileName}
                            label="Perfiles"
                            onChange={(e) => onChange(e, 'profile_id')}>
                            {profile.length > 0 && profile.map((item, index) => {
                                return (
                                    <MenuItem value={item['id']} key={index}>{item['profileName']}</MenuItem>
                                )
                            })}
                        </Select>
                    </CenterUpdated>
                    <CenterUpdated>
                        <p>Contraseña</p>
                        <TextField onChange={(e) => onChange(e, 'password')}></TextField>
                        <FullButton onClick={!data ? handleCreate : handleEdit} style={{ marginTop: '2em' }}>Enviar</FullButton>
                    </CenterUpdated>
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
}