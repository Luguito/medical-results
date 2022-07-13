import FilterDate from '../../../components/app/components/filter-date/filter-date';
import { LayoutComponent } from '../../../components/app/components/layout/layout';
import { TableComponent } from '../../../components/app/components/table/table';

export const Results = () => {
    return (
        <>
            <LayoutComponent
                Component={
                    <>
                        {/* <FilterDate></FilterDate> */}
                        <TableComponent></TableComponent>
                    </>
                }></LayoutComponent>
        </>
    )
}


export default Results;

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  