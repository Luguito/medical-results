import { TextColor } from '@global-colors';
import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
// Logo image
import Image from 'next/image';
import { useState } from 'react';
import logo from '../../assets/logo.png';

// Api
import { Auth } from '@api'

export const ForgotPage = () => {
    const [form, setForm] = useState({ ccid: '' })

    const handleFields = (type: string, value: string) => {
        setForm({ ...form, [type]: value })
    }

    const handleSubmit = () => {
        Auth.post('recover-my-password', form, {}).then(v => console.log(v));
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