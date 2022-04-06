import { TextColor } from '@global-colors';
import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
// Logo image
import Image from 'next/image';
import logo from '../../assets/logo.png';
// API
import { Auth } from '@api';
import { useEffect, useState } from 'react';
//  Next
import { useRouter } from 'next/router'

export const ResetPage = () => {
    const [pass, setPassword] = useState({ password: '' });
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('token', router.query['token'] as string)
    }, [])

    const handleSubmit = () => {
        Auth.put('new-password', pass, {}).then(response => {
            localStorage.setItem('token', response.accessToken as string)
            router.push('/app/dashboard');
        });
    }

    const handleField = (type: string, value: string) => {
        setPassword({ ...pass, [type]: value })
    }

    return (
        <ContainerCenter>
            <CardContainer style={{ padding: '2em', width: '25%' }}>
                <HeaderCard>
                    <TitleCard>
                        <Image src={logo} height="20px" width="35px" layout="responsive"></Image>
                        <h3 style={{ marginBottom: '8px', color: 'black' }}>Nueva Contraseña</h3>
                        <small style={{ color: TextColor }}>Ingresa tu nueva contraseña</small>
                    </TitleCard>
                </HeaderCard>
                <ContentCard>
                    <ItemCard>
                        Contraseña
                        <TextField size="small" onChange={({ target }) => handleField('password', target.value)} />
                    </ItemCard>
                    <ItemCard>
                        Repetir contraseña
                        <TextField size="small" />
                    </ItemCard>
                </ContentCard>
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }} onClick={handleSubmit}>Iniciar sesión</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default ResetPage;