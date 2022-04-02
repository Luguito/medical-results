import { } from 'react';
import { ButtonGrey, ContainerNav, ContainerText, SubTitle, Title } from './navbar.styled';

export const NavBarComponent = ({ title, subtitle, buttonText }: INavProps) => {

    return (
        <ContainerNav>
            <ContainerText>
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
            </ContainerText>
            <ButtonGrey>{buttonText}</ButtonGrey>
        </ContainerNav>
    )
}

export default NavBarComponent;

interface INavProps {
    title: string,
    subtitle: string,
    buttonText: string,
}