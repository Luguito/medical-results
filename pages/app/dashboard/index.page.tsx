import { LayoutComponent } from '../components/layout/layout';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { PrimaryBlueColor, TextColor } from '@global-colors';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Perfiles } from '../api';

export const DashboardPage = () => {
    const [cards, setCards] = useState([]);
    const labels = {
        'totalAdmins': 'No. Usuarios Admin',
        'totalPatients': 'No. Usuarios pacientes',
        'totalCups': 'No. Codigos CUP Activos',
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
                        <h3 style={{ color: TextColor }}>Examenes ejecutados mes actual</h3>
                        <div style={{ display: 'flex', gap: '1.5em', }}>
                            {cards && Object.keys(cards).map((item, index) => {
                                return (
                                    <>
                                        {/* @ts-ignore */}
                                        {['totalOrderByStatus'].includes(item) && cards['totalOrderByStatus'].map((status: any, i: number) => {
                                            return (
                                                <>
                                                    {/* @ts-ignore */}
                                                    <BoxChart key={i} title={labels?.totalOrderByStatus[status?.code]} content={status?.total} type="vertical"></BoxChart>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ color: TextColor }}>Examenes realizados en los ultimos 4 meses</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5em', }}>
                            {/* @ts-ignore */}
                            <RenderLineChart totalByMount={cards['totalByMount']}></RenderLineChart>
                            <div style={{ display: 'flex', gap: '1em', flexDirection: 'column' }}>
                                {cards && Object.keys(cards).map((item, index) => {
                                    return (
                                        <>
                                            {
                                                // @ts-ignore
                                                !['totalOrderByStatus'].includes(item) && labels[item] && <BoxChart key={index} title={labels[item as string]} content={cards[item as string]} type="horizontal" style={{
                                                    width: 250,
                                                    height: 80,
                                                    gap: '10px',
                                                    justify: 'space-around'
                                                }}></BoxChart>
                                            }
                                        </>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </>
                }></LayoutComponent>
        </>
    )
}


export default DashboardPage;

export const RenderLineChart = ({ totalByMount }: { totalByMount: any[] }) => {
    const month = ['','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return (
        <>
            <LineChart width={900} height={500} data={totalByMount} margin={{ top: 30, right: 20, bottom: 5, left: 0 }} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={(e) => month[e.month]} />
                <YAxis />
                <Tooltip />
            </LineChart>
        </>
    )
};

export const BoxChart = ({ title, content, type, style }: { title: string, content: string, type: 'vertical' | 'horizontal', style?: any}) => {
    return (
        <>
            <Box sx={{
                width: style ? style?.width : 200,
                height: style ? style?.height : 120,
                backgroundColor: 'white',
                borderRadius: '10px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: type === 'vertical' ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: style ? style?.justify : '',
                gap: style ? style?.gap : 0
            }}>
                <h5 style={{ color: PrimaryBlueColor }}>{title}</h5>
                <p style={{ color: PrimaryBlueColor, fontWeight: 400, fontSize: '1.4rem', margin: 0, border: `1px solid ${PrimaryBlueColor}`, padding: '5px 10px'}}>{content}</p>
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