import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';

export const ForgotPage = () => {
    return (
            <ContainerCenter>
                <CardContainer style={{ padding: '2em', width: '25%' }}>
                    <HeaderCard>
                        <TitleCard>
                            <h3 style={{ marginBottom: '8px', color: 'black' }}>Reestablecer Contraseña</h3>
                            <small>Ingresa tus credenciales</small>
                        </TitleCard>
                    </HeaderCard>
                    <ContentCard>
                        <ItemCard>
                            Cédula
                            <TextField size="small" />
                        </ItemCard>
                    </ContentCard>
                    <FooterCard style={{ justifyContent: 'center' }}>
                        <ButtonGrey style={{ width: '90%' }}>Enviar Confirmación</ButtonGrey>
                    </FooterCard>
                </CardContainer>
            </ContainerCenter>
    )
}

export default ForgotPage;