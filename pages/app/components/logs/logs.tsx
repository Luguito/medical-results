import { ContainerTable, Table, HeaderTable, ItemTable, RowTable, FooterTable } from './logs.styled';

export const Logs = () => {
    return (
        <>
            <ContainerTable>
                <Table>
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
                    <RowTable>
                        <ItemTable>Test</ItemTable>
                        <ItemTable>Test</ItemTable>
                        <ItemTable>Test</ItemTable>
                    </RowTable>
                </Table>
            </ContainerTable>
        </>
    )
}

export default Logs;