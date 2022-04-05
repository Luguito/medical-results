import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link';
import { TextColor } from '@global-colors';

// Logo image
import Image from 'next/image';
import logo from '../../../assets/logo.png';
// Schema
import { schema } from '../schema/login.schema';


export const LoginComponent = ({ changeLogin }: { changeLogin: Function }) => {
    const router = useRouter();
    const [form, setForm] = useState({ ccid: '', password: '' });

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
    }

    const handleLogin = () => {
        // If the first time user logged we gonna change de login using changeLogin Dispatcher if not true we redirect to dashboard

        // Redirect -> router.push('/app/dashboard');
        // changeLogin -> changeLogin(true)
        // Validate if login is completed schema.isValid(form)
        schema.isValid(form).then(res => console.log(res));
        console.log(form);
    }

    return (
        <ContainerCenter>
            <CardContainer style={{ padding: '2em', width: '25%' }}>
                <HeaderCard>
                    <TitleCard>
                        <Image src={logo} height="20px" width="35px" layout="responsive"></Image>
                        <h3 style={{ marginBottom: '8px', color: 'black' }}>Iniciar sesión</h3>
                        <small style={{ color: TextColor }}>Ingresa tus credenciales</small>
                    </TitleCard>
                </HeaderCard>
                <ContentCard>
                    <ItemCard>
                        Cedula
                        <TextField size="small" onChange={(e) => handleFields('ccid', e.target)} />
                    </ItemCard>
                    <ItemCard>
                        Contraseña
                        <TextField type="password" size="small" onChange={(e) => handleFields('password', e.target)} />
                    </ItemCard>
                    <Link href="/forgot-password">
                        <small style={{ textAlign: 'right', color: TextColor }}>Olvide mi contraseña</small>
                    </Link>
                </ContentCard>
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }} onClick={handleLogin}>Iniciar sesión</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default LoginComponent;