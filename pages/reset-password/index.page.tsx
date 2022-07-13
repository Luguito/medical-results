import { TextColor } from '@global-colors';
import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { Alert, AlertTitle, TextField } from '@mui/material';
// Logo image
import Image from 'next/image';
import logo from '../../assets/logo.png';
// API
import { Auth } from '@api';
import { useEffect, useState } from 'react';
//  Next
import { useRouter } from 'next/router';

export const ResetPage = () => {
    const [showAlert, setAlert] = useState({ show: false, message: '' });
    const [pass, setPassword] = useState({ password: '' });
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('token', router.query['token'] as string);
    }, [router])

    const handleSubmit = () => {
        Auth.put('new-password', pass, {}).then(response => {
            if (response.message) {
                return setAlert({ show: true, message: response.message }); 
            }
            setAlert({ show: true, message: 'Contraseña actualizada' })
            localStorage.setItem('token', response?.data?.accessToken as string);
            localStorage.setItem('user', JSON.stringify(response?.data?.user));
            if(response.data.user.role === 'patient') {
                router.push('/app/mis-resultados');
            } else {
                router.push('/app')
            }
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
                {
                    showAlert.show ?
                        <Alert severity="success">
                            <AlertTitle>Error</AlertTitle>
                            {showAlert.message}
                        </Alert> :
                        null
                }
                <ContentCard>
                    <ItemCard>
                        Contraseña
                        <TextField size="small" onChange={({ target }) => handleField('password', target.value)} type="password" />
                    </ItemCard>
                    <ItemCard>
                        Repetir contraseña
                        <TextField size="small" type="password" />
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

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  