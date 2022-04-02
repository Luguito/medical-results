import { ButtonGrey, ContainerNav, ContainerText, SubTitle, Title } from './navbar.styled';
import { PrimaryGreyColor } from '@global-colors';

export const NavBarComponent = ({ title, subtitle, buttonText, buttonColor }: INavProps) => {

    return (
        <ContainerNav>
            <ContainerText>
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
            </ContainerText>
            <ButtonGrey style={{ backgroundColor: buttonColor === 'blue' ? '#008dca' : PrimaryGreyColor}}>{buttonText}</ButtonGrey>
        </ContainerNav>
    )
}

export default NavBarComponent;

interface INavProps {
    title: string,
    subtitle: string,
    buttonText: string,
    buttonColor: 'blue' | 'grey'
}