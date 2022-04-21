import { ContainerLayout, Layout, OptionLists, ItemList, ContainerContent, Container } from './layout.styled';
import { UserLoggedComponent } from '../user/user';
import NavBarComponent from '../navbar/navbar';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Sidebar } from '../sidebar/sidebar';

export const LayoutComponent = ({ Component, navInfo }: ILayoutProps) => {
    const router = useRouter();

    const logOut = () => {
        localStorage.clear();
        router.push('/')
    }

    return (
        <ContainerLayout>
            <Layout>
                <UserLoggedComponent></UserLoggedComponent>
                <OptionLists>
                    <li>
                        <small style={{ marginLeft: '5px' }}>Mis Opciones</small>
                        <Sidebar role='admin'></Sidebar>
                    </li>
                </OptionLists>
            </Layout>
            <ContainerContent>
                <NavBarComponent {...navInfo}></NavBarComponent>
                <Container>
                    {Component}
                </Container>
            </ContainerContent>
        </ContainerLayout>
    )
}

export default LayoutComponent;

// Interfaces
interface ILayoutProps {
    Component: ReactElement,
    navInfo: Partial<INavInfo>
}

interface INavInfo {
    title: string,
    subtitle: string,
    buttonText: string,
    buttonColor: 'blue' | 'grey',
    showButton: boolean
}