import { ButtonGrey, ContainerNav, ContainerText, SubTitle, Title } from './navbar.styled';
import { PrimaryGreyColor } from '@global-colors';
import { useRouter } from 'next/router'

export const NavBarComponent = ({ title, subtitle, buttonText, buttonColor, showButton }: Partial<INavProps>) => {
    const router = useRouter();

    const goToResults = () => {
        let path = router.route.split('/')[2]

        path !== 'resultados' ? router.push('/app/resultados') : router.push('/app/mis-resultados')
    }
    return (
        <ContainerNav>
            <ContainerText>
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
            </ContainerText>
            {showButton && <ButtonGrey style={{ backgroundColor: buttonColor === 'blue' ? '#008dca' : PrimaryGreyColor}} onClick={goToResults}>{buttonText}</ButtonGrey>}
        </ContainerNav>
    )
}

export default NavBarComponent;

interface INavProps {
    title: string,
    subtitle: string,
    buttonText: string,
    buttonColor: 'blue' | 'grey',
    showButton: boolean
}