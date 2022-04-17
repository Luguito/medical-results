import { OptionLists, ItemList } from '../layout/layout.styled';

// Icons

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MenuBook from '@mui/icons-material/MenuBook';

export const Sidebar = ({ role }: { role: 'patient' | 'admin' }) => {

    const optionsByRole = {
        'patient': [
            { icon: MenuBookIcon, option: 'Mis Resultados' },
            { icon: SettingsIcon, option: 'Cerrar sesión' }
        ],
        'admin': [
            { icon: DashboardIcon, option: 'Inicio/Dashboard' },
            { icon: MenuBook, option: 'Códigos cup' },
            { icon: GroupIcon, option: 'Usuarios/Pacientes' },
            { icon: GroupIcon, option: 'Creador admin' },
            { icon: SettingsIcon, option: 'Cerrar sesión' },
        ]
    }


    return (
        <OptionLists style={{ paddingLeft: '0.2em' }}>
            {
                optionsByRole[role].map((item, index) => (
                    <ItemList key={index}>
                        {<item.icon></item.icon>}
                        {item.option}
                    </ItemList>
                ))
            }
        </OptionLists>
    )
}

export default Sidebar;