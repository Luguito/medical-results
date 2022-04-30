import { OptionLists, ItemList } from '../layout/layout.styled';

// Icons

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MenuBook from '@mui/icons-material/MenuBook';
import { useRouter } from 'next/router';

export const Sidebar = ({ role }: { role: 'patient' | 'admin' }) => {
    const router = useRouter();

    const optionsByRole = {
        'patient': [
            { icon: MenuBookIcon, option: 'Mis Resultados', url: '/mis-resultados' },
            { icon: SettingsIcon, option: 'Cerrar sesión', url: 'logout' }
        ],
        'admin': [
            { icon: DashboardIcon, option: 'Mis resultados', url: '/dashboard'},
            { icon: MenuBook, option: 'Códigos cup', url: '/cup'},
            { icon: GroupIcon, option: 'Usuarios/Pacientes', url: '/usuarios' },
            { icon: GroupIcon, option: 'Perfiles', url: '/perfiles' },
            { icon: GroupIcon, option: 'Creador admin', url: '/admin' },
            { icon: SettingsIcon, option: 'Cerrar sesión', url: 'logout' },
        ]
    }

    const handleRouter = (url: string) => {
        if(['logout'].includes(url)) {
            localStorage.clear()
            return router.push('/');
        }

        router.push(`/app` + url)
    }

    return (
        <OptionLists style={{ paddingLeft: '0.2em' }}>
            {
                optionsByRole[role].map((item, index) => (
                    <ItemList key={index} onClick={() => handleRouter(item.url)}>
                        {<item.icon></item.icon>}
                        {item.option}
                    </ItemList>
                ))
            }
        </OptionLists>
    )
}

export default Sidebar;