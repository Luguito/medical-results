import { useState, FC, useEffect, useRef  } from 'react';
import Box from '@mui/material/Box';
import { useReactToPrint } from 'react-to-print';

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
    isOpen: boolean;
    onClose: () => void
}

export const ModalComponent: FC<modal> = (props) => {
    const { onClose, isOpen } = props
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleClose = () => {
        onClose()
    }


    return (
        <div>    
            <Modal  open={isOpen} onClose={handleClose} id="printModal">
                <Box sx={style}>
                    <HeaderModal>
                        <Typography id="modal-modal-title" style={{ color: '#818181', fontWeight: '200' }}>
                            Resultado de laboratorio
                        </Typography>
                        <div>
                            <OutlineButton>Enviar por Correo</OutlineButton>
                            <FullButton onClick={handlePrint}>Descargar PDF</FullButton>
                        </div>
                    </HeaderModal>
                    <ContainerPDF>
                        {props.children}
                        <div ref={componentRef}>
                            <ResultTemplate   data={''} print={()=> {}}></ResultTemplate>
                        </div>
                    </ContainerPDF>
                </Box>
            </Modal>
           
        </div>
    );
}

