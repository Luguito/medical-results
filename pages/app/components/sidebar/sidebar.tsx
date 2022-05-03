import { OptionLists, ItemList } from '../layout/layout.styled';

// Icons

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MenuBook from '@mui/icons-material/MenuBook';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Sidebar = ({ role, permissions }: { role: 'patient' | 'admin' | string, permissions: string[] }) => {
    const [optionsByRole, setOptions] = useState({
        'patient': [
            { icon: MenuBookIcon, option: 'Mis Resultados', url: '/mis-resultados' },
            { icon: SettingsIcon, option: 'Cerrar sesión', url: 'logout' }
        ],
        'admin': [
            { icon: SettingsIcon, option: 'Cerrar sesión', url: 'logout' }
        ]
    })

    const router = useRouter();
    const adminRouter = {
        'perfiles': { icon: GroupIcon, option: 'Perfiles', url: '/perfiles' },
        'dashboard': { icon: DashboardIcon, option: 'Dashboard', url: '/dashboard' },
        'usuarios': { icon: GroupIcon, option: 'Usuarios/Pacientes', url: '/usuarios' },
        'cup': { icon: MenuBook, option: 'Códigos cup', url: '/cup' },
        'admin': { icon: GroupIcon, option: 'Creador admin', url: '/admin' },
    }

    useEffect(() => {
        role === 'admin' && permissions.map(route => {
            let option = route.trim()
            // @ts-ignore
            optionsByRole.admin.unshift(adminRouter[option]);
        })
        console.log(optionsByRole)
        setOptions({...optionsByRole});
    }, [])

    const handleRouter = (url: string) => {
        if (['logout'].includes(url)) {
            localStorage.clear()
            return router.push('/');
        }

        router.push(`/app` + url)
    }

    return (
        <OptionLists style={{ paddingLeft: '0.2em' }}>
            { 
            // @ts-ignore
                optionsByRole[role]?.map((item: any, index: number) => (
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