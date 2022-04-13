import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Schema
import { schema } from '../schema/first-time.schema';
// API
import { Auth } from '@api';
//  ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

export const FirstLoginComponent = () => {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '', recaptchaValue: '' });

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
    }

    const handleLogin = () => {
        schema.isValid(form).then(res => {
            if (res) {
                Auth.put('first-login', form, {}).then(res => {
                    if (res.message) {
                        return;
                        // return setError({ show: true, message: res.message })
                    }
                    localStorage.setItem('token', res?.data?.accessToken);
                    localStorage.setItem('user', JSON.stringify(res?.data?.user));
                    router.push('/app/dashboard');
                });
            }
        });
    }

    const handleCaptcha = (token: string | null) => {
        setForm({ ...form, 'recaptchaValue': token as string });
    }

    return (
        <ContainerCenter>
            <CardContainer style={{ padding: '2em', width: '25%' }}>
                <HeaderCard>
                    <TitleCard>
                        <h3 style={{ marginBottom: '8px', color: 'black' }}>Actualiza tu información</h3>
                        <small>Ingresa tus credenciales</small>
                    </TitleCard>
                </HeaderCard>
                <ContentCard>
                    <ItemCard>
                        Correo electronico
                        <TextField size="small" onChange={(e) => handleFields('email', e.target)} />
                    </ItemCard>
                    <ItemCard>
                        Nueva contraseña
                        <TextField size="small" type="password" onChange={(e) => handleFields('password', e.target)} />
                    </ItemCard>
                    <ItemCard>
                        Repetir contraseña
                        <TextField size="small" type="password" />
                    </ItemCard>
                </ContentCard>
                <ReCAPTCHA style={{ marginTop: '1em' }}
                    sitekey="6Lcv30wfAAAAAFyecXGytXv1iVLMO4AMGUU54jpe"
                    onChange={handleCaptcha}
                />
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }} onClick={handleLogin}>Continuar</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default FirstLoginComponent;