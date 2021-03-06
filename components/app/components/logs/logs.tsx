import { Perfiles } from 'components/app/api';
import { useEffect, useState } from 'react';
import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './logs.styled';

export const Logs = ({ url, logKey }: { url: string, logKey: any }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getLogs(url)
    }, []);

    const getLogs = async (url: string) => await Perfiles.get('log', {}, { url, logKey }).then(v => setLogs(v.data))

    return (
        <>
            <ContainerTable>
                <Table>
                    <thead>
                        <RowTable>
                            <HeaderTable>
                                Description
                            </HeaderTable>
                            <HeaderTable>
                                Nombre de usuario
                            </HeaderTable>
                            <HeaderTable>
                                Fecha
                            </HeaderTable>
                        </RowTable>
                    </thead>
                    <tbody>
                        {logs.length > 0 && logs.map((item: any, index: number) => {
                            return (
                                <RowTable key={index}>
                                    <ItemTable>{item?.action}</ItemTable>
                                    <ItemTable>{item?.name}</ItemTable>
                                    <ItemTable>{new Date(item?.createdAt).toLocaleString()}</ItemTable>
                                </RowTable>
                            )
                        })}
                    </tbody>
                </Table>
            </ContainerTable>
        </>
    )
}

export default Logs;