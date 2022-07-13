import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { Alert, AlertTitle, TextField } from '@mui/material';
import { TextColor } from '@global-colors';
import { useRouter } from 'next/router'
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Title, Paragraph } from './login.styled'

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
    const [form, setForm] = useState({ ccid: '', password: '', recaptchaValue: '' });
    const [showError, setError] = useState({ show: false, message: '' });
    const [disabled, setDisabled] = useState(true);
    const recaptchaRef = useRef();
    const router = useRouter();

    const handleFields = (type: string, { value }: { value: string }) => {
        setForm({ ...form, [type]: value });
        schema.isValid(form).then(valid => {
            valid && setDisabled(false);
            !valid && setDisabled(true);
        });
    }

    const handleLogin = () => {
        schema.validate(form).catch(e => setError({ show: true, message: e.message }))

        schema.isValid(form).then(valid => {
            if (valid) {
                setDisabled(true);
                Auth.post('login', form, {}).then(res => {
                    if (res.message) {
                        setDisabled(false);
                        (recaptchaRef.current as any).reset();
                        return setError({ show: true, message: res.message });
                    }
                    localStorage.setItem('token', res?.data?.accessToken);
                    localStorage.setItem('user', JSON.stringify(res?.data?.user));

                    setDisabled(false);
                    res?.data?.user?.pendingPassword && changeLogin(true);
                    !res?.data?.user?.pendingPassword && router.push('/app');
                });
            }
        });
    }

    const handleCaptcha = (token: string | null) => {
        setForm({ ...form, 'recaptchaValue': token as string });
        schema.validate(form).then(v => setDisabled(false)).catch(e => console.error(e.message));
    }

    const expiredCaptcha = () => {
        setForm({ ...form, 'recaptchaValue': '' });
        setDisabled(true);
    }

    return (
        <ContainerCenter>
            <CardContainer style={{ padding: '2em', width: '25%' }}>
                <HeaderCard>
                    <TitleCard>
                        <Image src={logo} height="20px" width="35px" layout="responsive"></Image>
                        <Title>Iniciar sesión</Title>
                        <Paragraph >Ingresa tus credenciales</Paragraph>
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
                        <TextField size="small" label="Cedula" variant="standard" onChange={(e) => handleFields('ccid', e.target)} />
                    </ItemCard>
                    <ItemCard>
                        <TextField type="password" label="Contraseña" variant="standard" size="small" onChange={(e) => handleFields('password', e.target)} />
                    </ItemCard>
                    <Link href="/forgot-password">
                        <small style={{ textAlign: 'right', color: TextColor }}>Olvide mi contraseña</small>
                    </Link>
                </ContentCard>
                {/* @ts-ignore */}
                <ReCAPTCHA ref={recaptchaRef}
                    sitekey="6Lcv30wfAAAAAFyecXGytXv1iVLMO4AMGUU54jpe"
                    onChange={handleCaptcha}
                    onExpired={expiredCaptcha}
                />
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '60%' }} onClick={handleLogin} disabled={disabled}>Iniciar sesión</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default LoginComponent;