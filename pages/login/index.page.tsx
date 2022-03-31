import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
import Link from 'next/link';

export const LoginComponent = () => {
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
                        <TextField size="small" />
                    </ItemCard>
                    <ItemCard>
                        Contraseña
                        <TextField size="small" />
                    </ItemCard>
                    <Link href="/forgot-password">
                        <small style={{ textAlign: 'right' }}>Olvide mi contraseña</small>
                    </Link>
                </ContentCard>
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }}>Iniciar sesión</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default LoginComponent;