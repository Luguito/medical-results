import { Perfiles } from 'pages/app/api';
import { useEffect } from 'react';
import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './logs.styled';

export const Logs = ({ url }: { url: string }) => {
    useEffect(() => {
        getLogs(url)
    }, [])
    const getLogs = async (url: string) => await Perfiles.get('log', {}, { url }).then(v => console.log(v))

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
                        <RowTable>
                            <ItemTable>Test</ItemTable>
                            <ItemTable>Test</ItemTable>
                            <ItemTable>Test</ItemTable>
                        </RowTable>
                    </tbody>
                </Table>
            </ContainerTable>
        </>
    )
}

export default Logs;