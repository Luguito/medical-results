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
    const [form, setForm] = useState({});
    const [permissions, setPermission] = useState<string[]>([]);

    useEffect(() => {
        setForm({
            profileName: data?.profileName,
            permissions: data?.permisions
        });
    },[data]);

    const handleClose = () => onClose();

    const handleCreate = async () =>  await Perfiles.post('profile', form, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });

    const handleEdit = async () => await Perfiles.put(`profile/${data.id}`, form, {})

    const onChangeCheckbox = (e: any) => {
        let name: string = e.target.name;

        let exist = permissions.includes(name);

        !exist && setPermission([...permissions, name]);

        if (exist) {
            let index = permissions.findIndex(item => item === name);

            let x = permissions.splice(index, 1);

            setPermission([...permissions]);
        }

        setForm({ ...form, 'permisions': permissions.join(',') });
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
                        <TextField onChange={(e) => onChange(e, 'profileName')} value={form?.profileName}></TextField>
                    </CenterUpdated>
                    <CenterUpdated>
                        <p>Permisos</p>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('dashboard')}/>} label="Dashboard" name="dashboard" onChange={onChangeCheckbox} />
                            <FormControlLabel control={<Checkbox checked={data?.permissions?.split(',').includes('perfiles')}/>} label="Perfiles" name="perfiles" onChange={onChangeCheckbox} />
                        </FormGroup>
                        <FullButton onClick={!data ? handleCreate : handleEdit} style={{ marginTop: '2em' }}>Enviar</FullButton>
                    </CenterUpdated>
                </Box>
            </Modal>
        </div>
    )
}