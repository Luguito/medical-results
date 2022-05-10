import { ContainerLayout, Layout, OptionLists, ItemList, ContainerContent, Container } from './layout.styled';
import { UserLoggedComponent } from '../user/user';
import NavBarComponent from '../navbar/navbar';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Sidebar } from '../sidebar/sidebar';
import { useLoggedUser } from '../../hooks/useLoggedUser';
import Image from 'next/image';
import Logo from '../../../../assets/Logo_fondo_azul.svg';

export const LayoutComponent = ({ Component }: ILayoutProps) => {
    const { role, permissions } = useLoggedUser()
    const router = useRouter();

    const logOut = () => {
        localStorage.clear();
        router.push('/')
    }

    return (
        <ContainerLayout>
            <Layout>
                {/* <UserLoggedComponent></UserLoggedComponent> */}
                <div style={{ width: '9em' }}>
                    <Image src={Logo} height="40px" width="45px" layout="responsive" style={{ borderRadius: '50%' }}></Image>
                </div>
                <OptionLists>
                    <li>
                        <small style={{ marginLeft: '5px' }}>Mis Opciones</small>
                        {role && <Sidebar role={role} permissions={permissions.split(',')}></Sidebar>}
                    </li>
                </OptionLists>
            </Layout>
            <ContainerContent>
                <NavBarComponent></NavBarComponent>
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
}