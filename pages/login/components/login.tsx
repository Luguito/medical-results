import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';

export const LoginComponent = ({ changeLogin }: { changeLogin: Function }) => {
    const router = useRouter();
    const [form, setForm] = useState({
        number_id: '',
        password: ''
    });

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
    }

    const handleLogin = () => {
        // If the first time user logged we gonna change de login using changeLogin Dispatcher if not true we redirect to dashboard

        // Redirect -> router.push('/app/dashboard');
        // changeLogin -> changeLogin(true)

        console.log(form);
    }

    return (
        <ContainerCenter>
            <CardContainer style={{ padding: '2em', width: '25%' }}>
                <HeaderCard>
                    <TitleCard>
                        <h3 style={{ marginBottom: '8px', color: 'black' }}>Iniciar sesión</h3>
                        <small>Ingresa tus credenciales</small>
                    </TitleCard>
                </HeaderCard>
                <ContentCard>
                    <ItemCard>
                        Cedula
                        <TextField size="small" onChange={(e) => handleFields('number_id', e.target)} />
                    </ItemCard>
                    <ItemCard>
                        Contraseña
                        <TextField type="password" size="small" onChange={(e) => handleFields('password', e.target)} />
                    </ItemCard>
                    <Link href="/forgot-password">
                        <small style={{ textAlign: 'right' }}>Olvide mi contraseña</small>
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