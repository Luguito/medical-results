import { ContainerNav, ContainerText, SubTitle, Title, Container } from './navbar.styled';
import { UserLoggedComponent } from '../user/user';
import LogoutIcon from '@mui/icons-material/Logout';
import Router from 'next/router';
import { useLoggedUser } from 'hooks/useLoggedUser';
import { useEffect } from 'react';

export const NavBarComponent = ({ title, subtitle, buttonText, buttonColor, showButton, fn }: Partial<INavProps>) => {
    const user = useLoggedUser();

    const logOut = () => {
        localStorage.clear();
        Router.push('/')
    }
    return (
        <ContainerNav>
            <Container>
                <ContainerText>
                    <UserLoggedComponent></UserLoggedComponent>
                    {/* <Title>Bienvenido, {user?.fullname}</Title>
                    |
                    <SubTitle>{user?.role == 'admin' ? 'Administrador' : 'Paciente'}</SubTitle> */}
                </ContainerText>
                <ContainerText>
                    <LogoutIcon onClick={logOut} style={{ cursor: 'pointer' }}></LogoutIcon>
                </ContainerText>
                {/* {showButton && <ButtonGrey style={{ backgroundColor: buttonColor === 'blue' ? '#008dca' : PrimaryGreyColor }} onClick={fn}>{buttonText}</ButtonGrey>} */}
            </Container>
        </ContainerNav>
    )
}

export default NavBarComponent;

interface INavProps {
    title: string,
    subtitle: string,
    buttonText: string,
    buttonColor: 'blue' | 'grey',
    showButton: boolean,
    fn?: () => void
}