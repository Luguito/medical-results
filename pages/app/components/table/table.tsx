import { Table, HeaderTable, ItemTable, RowTable } from './table.styled';

export const TableComponent = () => {
    const dummyData = ['Test', 'Test', 'Test', 'Test', 'Test', 'Test',]
    return (
        <>
            <Table>
                <RowTable>
                    <HeaderTable>Consecutivo</HeaderTable>
                    <HeaderTable>Fecha</HeaderTable>
                    <HeaderTable>Código CUP</HeaderTable>
                    <HeaderTable>Nombre del examen</HeaderTable>
                    <HeaderTable>Estado del examen</HeaderTable>
                    <HeaderTable>Acción</HeaderTable>
                </RowTable>
                <RowTable>
                    {
                        dummyData.map((item, index) => {
                            return (
                                <ItemTable>Test #{index}</ItemTable>
                            )
                        })
                    }
                </RowTable>
            </Table>
        </>
    )
}

export default TableComponent;