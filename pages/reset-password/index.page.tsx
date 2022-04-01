import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';

export const ResetPage = () => {
    return (
            <ContainerCenter>
                <CardContainer style={{ padding: '2em', width: '25%' }}>
                    <HeaderCard>
                        <TitleCard>
                            <h3 style={{ marginBottom: '8px', color: 'black' }}>Nueva Contraseña</h3>
                            <small>Ingresa tu nueva contraseña</small>
                        </TitleCard>
                    </HeaderCard>
                    <ContentCard>
                        <ItemCard>
                            Contraseña
                            <TextField size="small" />
                        </ItemCard>
                        <ItemCard>
                            Repetir contraseña
                            <TextField size="small" />
                        </ItemCard>
                    </ContentCard>
                    <FooterCard style={{ justifyContent: 'center' }}>
                        <ButtonGrey style={{ width: '90%' }}>Iniciar sesión</ButtonGrey>
                    </FooterCard>
                </CardContainer>
            </ContainerCenter>
    )
}

export default ResetPage;