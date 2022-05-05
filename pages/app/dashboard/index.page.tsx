import { LayoutComponent } from '../components/layout/layout';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TextColor } from '@global-colors';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Perfiles } from '../api';

export const DashboardPage = () => {
    const [cards, setCards] = useState([]);
    const labels = {
        'totalAdmins': 'Admins',
        'totalPatients': 'Pacientes',
        'totalCups': 'Codigos cup',
        'totalOrderByStatus': {
            'O': 'ORDENADO',
            'E': 'EN PROCESO',
            'A': 'APLICADO',
            'I': 'INTERPRETADO',
            'N': 'ANULADO',
            'X': 'RESULTADO EXTERNO',
        }
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
                        <h3 style={{ color: TextColor }}>Total ordenes por estado</h3>
                        <div style={{ display: 'flex', gap: '1.5em', }}>
                            {cards && Object.keys(cards).map((item, index) => {
                                return (
                                    <>
                                        {/* @ts-ignore */}
                                        {['totalOrderByStatus'].includes(item) && cards['totalOrderByStatus'].map((status: any, i: number) => {
                                            return (
                                                <>
                                                    {/* @ts-ignore */}
                                                    <BoxChart key={i} title={labels?.totalOrderByStatus[status?.code]} content={status?.total}></BoxChart>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ color: TextColor }}>Total resultados ultimos 4 meses</h3>
                            <h3 style={{ color: TextColor }}>Usuarios y Cups activos</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5em', }}>
                            {/* @ts-ignore */}
                            <RenderLineChart totalByMount={cards['totalByMount']}></RenderLineChart>
                            <div style={{ display: 'flex', gap: '1.5em', flexDirection: 'column' }}>
                                {cards && Object.keys(cards).map((item, index) => {
                                    return (
                                        <>
                                            {
                                                // @ts-ignore
                                                !['totalOrderByStatus'].includes(item) && labels[item] && <BoxChart key={index} title={labels[item as string]} content={cards[item as string]}></BoxChart>
                                            }
                                        </>
                                    )
                                })
                                }
                            </div>
                        </div>
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

export const RenderLineChart = ({ totalByMount }: { totalByMount: any[] }) => {
    return (
        <>
            <LineChart width={1000} height={500} data={totalByMount} margin={{ top: 30, right: 20, bottom: 5, left: 0 }} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
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


export interface IDashboard {
    totalByMount: any[]
    totalAdmins: any,
    totalPatients: any,
    totalCups: any,
    totalOrderByStatus: any
}