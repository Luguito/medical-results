import { ContainerLayout, Layout, OptionLists, ItemList } from './layout.styled';
import { UserLoggedComponent } from '../user/user';

// Icons

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const LayoutComponent = () => {
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
        </ContainerLayout>
    )
}

export default LayoutComponent;