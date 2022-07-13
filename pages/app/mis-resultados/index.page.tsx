import { LayoutComponent } from '../../../components/app/components/layout/layout';
import { TableComponent } from '../../../components/app/components/table/table';

export const MisResultados = () => {
    return (
        <>
            <LayoutComponent
                Component={
                    <TableComponent></TableComponent>
                }></LayoutComponent>
        </>
    )
}


export default MisResultados;

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  