import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { Alert, AlertColor, AlertTitle, TextField } from '@mui/material';
import { TextColor } from '@global-colors';
// Logo image
import logo from '../../assets/logo.png';
import { useState } from 'react';
import Image from 'next/image';
// Api
import { Auth } from '@api'

export const ForgotPage = () => {
    const [showAlert, setAlert] = useState<IAlert>({ show: false, message: '', type: 'success' });
    const [form, setForm] = useState({ ccid: '' });

    const handleFields = (type: string, value: string) => {
        setForm({ ...form, [type]: value })
    }

    const handleSubmit = () => {
        Auth.post('recover-my-password', form, {}).then(resp => {
            if (resp.message) {
                return setAlert({ show: true, message: resp.message, type: 'error' });
            }

            setAlert({ show: true, message: 'Correo de recuperacion enviado', type: 'success' })
        });
    }

    return (
        <ContainerCenter>
            <CardContainer style={{ padding: '2em', width: '25%' }}>
                <HeaderCard>
                    <TitleCard>
                        <Image src={logo} height="20px" width="35px" layout="responsive"></Image>
                        <h3 style={{ marginBottom: '8px', color: 'black' }}>Reestablecer Contraseña</h3>
                        <small style={{ color: TextColor }}>Ingresa tus credenciales</small>
                    </TitleCard>
                </HeaderCard>
                {
                    showAlert.show ?
                        <Alert severity={showAlert.type} style={{ marginBottom: '2em' }}>
                            <AlertTitle>{showAlert.type.substring(0, 1).toUpperCase() + showAlert.type.substring(1)}</AlertTitle>
                            {showAlert.message}
                        </Alert>
                        :
                        null
                }
                <ContentCard>
                    <ItemCard>
                        Cédula
                        <TextField size="small" onChange={({ target }) => handleFields('ccid', target.value)} />
                    </ItemCard>
                </ContentCard>
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }} onClick={handleSubmit}>Enviar Confirmación</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default ForgotPage;


interface IAlert {
    type: AlertColor,
    show: boolean,
    message: string
}
export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  