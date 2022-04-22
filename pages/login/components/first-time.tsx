import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField, Alert, AlertTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

// Schema
import { schema } from '../schema/first-time.schema';
// API
import { Auth } from '@api';
//  ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

export const FirstLoginComponent = () => {
    const [form, setForm] = useState({ email: '', password: '', repeatPassword: '', recaptchaValue: '' });
    const [showError, setError] = useState({ show: false, message: '' });
    const [disabled, setDisabled] = useState(true);
    const recaptchaRef = useRef()
    const router = useRouter();

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
        schema.isValid(form).then(valid => {
            valid && setDisabled(false);
            !valid && setDisabled(true);
        });
    }

    const handleLogin = () => {
        schema.validate(form).catch(e => setError({ show: true, message: e.message }));

        schema.isValid(form).then(res => {
            if (res) {
                setDisabled(true);
                // @ts-ignore
                delete form?.repeatPassword;
                Auth.put('first-login', form, {}).then(res => {
                    if (res.message) {
                        setDisabled(false);
                        (recaptchaRef.current as any).reset();
                        return setError({ show: true, message: res.message });
                    }
                    localStorage.setItem('token', res?.data?.accessToken);
                    localStorage.setItem('user', JSON.stringify(res?.data?.user));
                    router.push('/app/dashboard');
                    setDisabled(false)
                });
            }
        });
    }

    const handleCaptcha = (token: string | null) => {
        setForm({ ...form, 'recaptchaValue': token as string });
        setDisabled(false);
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
                    {
                        showError.show ?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {showError.message}
                            </Alert> :
                            null
                    }
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
                        <TextField size="small" type="password" onChange={(e) => handleFields('repeatPassword', e.target)} />
                    </ItemCard>
                </ContentCard>
                {/* @ts-ignore */}
                <ReCAPTCHA style={{ marginTop: '1em' }} ref={recaptchaRef}
                    sitekey="6Lcv30wfAAAAAFyecXGytXv1iVLMO4AMGUU54jpe"
                    onChange={handleCaptcha}
                />
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }} onClick={handleLogin} disabled={disabled}>Continuar</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default FirstLoginComponent;