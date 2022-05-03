import { LayoutComponent } from '../components/layout/layout';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TextColor } from '@global-colors';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Perfiles } from '../api';

export const DashboardPage = () => {
    const [cards, setCards] = useState([]);
    const labels = {
        'numberAdmins': 'Admins',
        'totalPatients': 'Pacientes'
    }
    useEffect(() => {
        getDashboard()
    }, [])

    const getDashboard = async () => await Perfiles.get('dashboard', {}).then((v) => setCards(v.data));

    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <div style={{ display: 'flex', gap: '1.5em' }}>
                            {Object.keys(cards).map((item, index) => {
                                return (
                                    <>
                                        <BoxChart key={index} title={labels[item as string]} content={cards[item as string]}></BoxChart>
                                    </>
                                )
                            })}
                        </div>
                        <RenderLineChart></RenderLineChart>
                    </>
                }
                navInfo={{
                    buttonText: 'Buscar resultados',
                    title: 'Tus resultados',
                    subtitle: 'Encuentra tus resultados de manera facil',
                    buttonColor: 'blue',
                    showButton: true
                }}></LayoutComponent>
        </>
    )
}


export default DashboardPage;

export const RenderLineChart = () => {
    const data = [{ name: 'Mes 1', patient: 200, cup: 20 }, { name: 'Mes 2', patient: 140, cup: 10 }];

    return (
        <>
            <LineChart width={1000} height={500} data={data} margin={{ top: 30, right: 20, bottom: 5, left: 0 }} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Line type="monotone" dataKey="patient" stroke="#8884d8" />
                <Line type="monotone" dataKey="cup" stroke="#000000" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </>
    )
};

export const BoxChart = ({ title, content }: { title: string, content: string }) => {
    return (
        <>
            <Box sx={{
                width: 150,
                height: 120,
                backgroundColor: 'white',
                borderRadius: '10px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h3 style={{ color: TextColor }}>{title}</h3>
                <p style={{ color: '#252733', fontWeight: 400, fontSize: '1.4rem', margin: 0 }}>{content}</p>
            </Box>
        </>
    )
}