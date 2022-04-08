import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageIcon from '@mui/icons-material/Image';
// Styled Components
import { HeaderModal, OutlineButton, FullButton, ContainerPDF } from './modal.styled';

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


export default function PdfModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>

            <Button onClick={handleOpen}><ImageIcon></ImageIcon></Button>
            <Modal open={open} onClose={handleClose} keepMounted>
                <Box sx={style}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            Nombre del resultado
                        </Typography>
                        <div>
                            <OutlineButton>Enviar por Correo</OutlineButton>
                            <FullButton>Descargar PDF</FullButton>
                        </div>
                    </HeaderModal>
                    <ContainerPDF></ContainerPDF>
                </Box>
            </Modal>
        </div>
    );
}