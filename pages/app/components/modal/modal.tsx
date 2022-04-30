import { useState, FC, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useReactToPrint } from 'react-to-print';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

// Styled Components
import { HeaderModal, OutlineButton, FullButton, ContainerPDF, CenterUpdated } from './modal.styled';
import { ResultTemplate } from '../result-template'
import { Results } from '../../api';
import { Auth } from '@api'

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
    ccid?:string;
    isOpen: boolean;
    onClose: () => void;
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
    const { onClose, isOpen, ccid} = props
    const handleClose = () => onClose();

    const handleReset = async () => {
        let res = await Auth.get(`resend-recovery-password/${ccid}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        console.log(res)
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
                    height: 200,
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
                        <TextField></TextField>
                        <FullButton onClick={handleReset}>Enviar</FullButton>
                    </CenterUpdated>
                </Box>
            </Modal>
        </div>
    )
}