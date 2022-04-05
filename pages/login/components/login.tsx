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
// API
import { Auth } from '@api';

export const LoginComponent = ({ changeLogin }: { changeLogin: Function }) => {
    const router = useRouter();
    const [form, setForm] = useState({ ccid: '', password: '' });

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
    }

    const handleLogin = () => {
        schema.isValid(form).then(res => {
            if(res) {
                Auth.post('login', form, {}).then(res => {
                    localStorage.setItem('token', res?.data?.accessToken);
                    localStorage.setItem('user', JSON.stringify(res?.data?.user));

                    res?.data?.user?.pendingPassword && changeLogin(true);
                    !res?.data?.user?.pendingPassword && router.push('/app/dashboard');
                });
            }
        });
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