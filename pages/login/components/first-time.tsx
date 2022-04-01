import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
import Link from 'next/link';

export const FirstLoginComponent = () => {
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
                        <TextField size="small" />
                    </ItemCard>
                    <ItemCard>
                        Nueva contraseña
                        <TextField size="small" />
                    </ItemCard>
                    <ItemCard>
                        Repetir contraseña
                        <TextField size="small" />
                    </ItemCard>
                </ContentCard>
                <FooterCard style={{ justifyContent: 'center' }}>
                    <ButtonGrey style={{ width: '90%' }}>Continuar</ButtonGrey>
                </FooterCard>
            </CardContainer>
        </ContainerCenter>
    )
}

export default FirstLoginComponent;