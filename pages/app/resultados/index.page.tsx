import FilterDate from '../components/filter-date/filter-date';
import { LayoutComponent } from '../components/layout/layout';
import { TableComponent } from '../components/table/table';

export const Results = () => {
    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        <FilterDate></FilterDate>
                        <TableComponent></TableComponent>
                    </>
                }></LayoutComponent>
        </>
    )
}


export default Results;