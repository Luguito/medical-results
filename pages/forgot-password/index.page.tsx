import { TextColor } from '@global-colors';
import { CardContainer, ContainerCenter, ContentCard, FooterCard, HeaderCard, TitleCard, ItemCard, ButtonGrey } from '@global-styled';
import { TextField } from '@mui/material';
// Logo image
import Image from 'next/image';
import logo from '../../assets/logo.png';

export const ForgotPage = () => {
    return (
            <ContainerCenter>
                <CardContainer style={{ padding: '2em', width: '25%' }}>
                    <HeaderCard>
                        <TitleCard>
                            <Image src={logo} height="20px" width="35px" layout="responsive"></Image>
                            <h3 style={{ marginBottom: '8px', color: 'black' }}>Reestablecer Contraseña</h3>
                            <small style={{ color: TextColor }}>Ingresa tus credenciales</small>
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