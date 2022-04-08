import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { Alert, AlertTitle, TextField } from '@mui/material';
import { TextColor } from '@global-colors';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link';

// Logo image
import logo from '../../../assets/logo.png';
import Image from 'next/image';
// Schema
import { schema } from '../schema/login.schema';
// API
import { Auth } from '@api';
// Captcha
import ReCAPTCHA from "react-google-recaptcha";

export const LoginComponent = ({ changeLogin }: { changeLogin: Function }) => {
    const [showError, setError] = useState({ show: false, message: '' });
    const [form, setForm] = useState({ ccid: '', password: '', recaptchaValue: '' });
    const router = useRouter();

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
    }

    const handleLogin = () => {
        schema.validate(form).catch(e => setError({ show: true, message: e.message }))

        schema.isValid(form).then(valid => {
            if (valid) {
                Auth.post('login', form, {}).then(res => {
                    if (res.message) {
                        return setError({ show: true, message: res.message })
                    }
                    localStorage.setItem('token', res?.data?.accessToken);
                    localStorage.setItem('user', JSON.stringify(res?.data?.user));

                    res?.data?.user?.pendingPassword && changeLogin(true);
                    !res?.data?.user?.pendingPassword && router.push('/app/dashboard');
                });
            }
        });
    }

    const handleCaptcha = (token: string | null) => {
        setForm({ ...form, 'recaptchaValue': token as string});
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
                    {
                        showError.show ?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {showError.message}
                            </Alert> :
                            null
                    }
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
                <ReCAPTCHA
                    sitekey="6Lcv30wfAAAAAFyecXGytXv1iVLMO4AMGUU54jpe"
                    onChange={handleCaptcha}
                />
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }} onClick={handleLogin}>Iniciar sesión</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default LoginComponent;