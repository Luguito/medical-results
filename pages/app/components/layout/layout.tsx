import { ContainerLayout, Layout, OptionLists, ItemList, ContainerContent } from './layout.styled';
import { UserLoggedComponent } from '../user/user';
import NavBarComponent from '../navbar/navbar';
import { ReactElement } from 'react';

// Icons

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const LayoutComponent = ({ Component, navInfo }: ILayoutProps) => {
    return (
        <ContainerLayout>
            <Layout>
                <UserLoggedComponent></UserLoggedComponent>
                <OptionLists>
                    <li>
                        <small style={{ marginLeft: '5px' }}>Mis Opciones</small>
                        <OptionLists style={{ paddingLeft: '2em' }}>
                            <ItemList>
                                <MenuBookIcon></MenuBookIcon>
                                Mis Resultados
                            </ItemList>
                            <ItemList>
                                <SettingsIcon></SettingsIcon>
                                Settings
                            </ItemList>
                        </OptionLists>
                    </li>
                </OptionLists>
            </Layout>
            <ContainerContent>
                <NavBarComponent {...navInfo}></NavBarComponent>
                {Component}
            </ContainerContent>
        </ContainerLayout>
    )
}

export default LayoutComponent;

// Interfaces
interface ILayoutProps {
    Component: ReactElement,
    navInfo: INavInfo
}

interface INavInfo {
    title: string,
    subtitle: string,
    buttonText: string,
}