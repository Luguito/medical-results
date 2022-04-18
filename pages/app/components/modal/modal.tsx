import { useState, FC, useEffect } from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Styled Components
import { HeaderModal, OutlineButton, FullButton, ContainerPDF } from './modal.styled';
import { WindowSharp } from '@mui/icons-material';
import { ResultTemplate } from '../result-template'

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

interface modal {
    title?: string;
    onPrint: () => void;
    isOpen: boolean;
    onClose: () => void
}

export const ModalComponent: FC<modal> = (props) => {
    const { isOpen, onPrint, onClose } = props

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        onClose()
    }

    useEffect(()=> {
        console.log('dentro del effecto  ', isOpen)
        setOpen(isOpen)
    },[isOpen])
    
    const onPrintHandler = async () => {
        onPrint()
        // handleClose()
    }
    console.log('llego despues del print ', isOpen)
    

    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={style}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            Nombre del resultado
                        </Typography>
                        <div>
                            <OutlineButton>Enviar por Correo</OutlineButton>
                            <FullButton onClick={onPrintHandler}>Descargar PDF</FullButton>
                        </div>
                    </HeaderModal>
                    <ContainerPDF>
                        {props.children}
                        <ResultTemplate data={''} print={()=> {}}></ResultTemplate>
                    </ContainerPDF>
                </Box>
            </Modal>
        </div>
    );
}

