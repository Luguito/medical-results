import react, { FC, useEffect } from 'react';
import { 
    ResultContainer,
    PreHeader,
    Header,
    HeaderBox,
    HeaderItem,
    ItemText,
    TableContainer,
    Table
} from './result-template';

interface ResultTemplateProps {
    data: any;
    print: () => void;
}

export const ResultTemplate: FC<ResultTemplateProps> = (props) => {
    const { print } = props

    useEffect(() => {
    }, [print])

    

    return (
        <ResultContainer id="printable">
            <PreHeader>
                <img width="200" src="/logo.png" alt=""/>
            </PreHeader>
            <Header>
                <HeaderBox>
                    <HeaderItem>
                        <ItemText withMargin>PACIENTE</ItemText>
                        <ItemText>HOMERO SIMPSON</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>INGRESO</ItemText>
                        <ItemText>2021-10-19 10:30</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>MEDICO</ItemText>
                        <ItemText>RICARDO BUTRON</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>HISTORIA</ItemText>
                        <ItemText>554645654</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>SEDE</ItemText>
                        <ItemText>CALLE 30</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>TELEFONO</ItemText>
                        <ItemText>3015041227</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>EMPRESA</ItemText>
                        <ItemText>HUN</ItemText>
                    </HeaderItem>
                </HeaderBox>
                <HeaderBox>
                    <HeaderItem>
                        <ItemText withMargin>ORDEN</ItemText>
                        <ItemText>9835324681</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>EDAD</ItemText>
                        <ItemText>35 AÑOS</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>SEXO</ItemText>
                        <ItemText>M</ItemText>
                    </HeaderItem>
                    <HeaderItem>
                        <ItemText withMargin>FECHA DE NACIMIENTO</ItemText>
                        <ItemText>07/06/1989</ItemText>
                    </HeaderItem>
                </HeaderBox>
            </Header>
            <TableContainer>
                <Table>
                    <thead>
                        <tr >
                            <th>Examen</th>
                            <th>Resultado</th>
                            <th>Unidades</th>
                            <th>Inventario Biologico de Referencia</th>
                            <th>Fecha Validacion</th>
                        </tr>
                    </thead>    
                    <tbody>
                        <tr>
                            <td ><p>BILIRRUBINAS : &nbsp; &nbsp;&nbsp;</p>

                                </td>
                            <td style={{fontWeight:'bold'}}>0.5</td>
                            <td></td>
                            <td style={{fontSize: '10px', margin: 0}}>
                                <p>Valores de Referencia: : &nbsp; &nbsp;&nbsp;</p>
                                <p>Bilirrubina Total .................: :0.67 mg/dl &nbsp; &nbsp;&nbsp;</p>
                                <p>Hasta 1.2 mg/dl : &nbsp; &nbsp;&nbsp;</p>
                                <p>Bilirrubina Directa ...............: :0.25 mg/dl &nbsp; &nbsp;&nbsp;</p>
                                <p>Hasta 0.25 mg/dl : &nbsp; &nbsp;&nbsp;</p>
                                <p>Bilirrubina Indirecta .............: :0.42 mg/dl &nbsp;</p></td>
                            <td>03/05/2022</td>
                        </tr>
                        <tr>
                            <td>Triglic&eacute;ridos......................: :</td>
                            <td style={{fontWeight:'bold'}}>75.5 mg/dl</td>
                            <td></td>
                            <td  style={{fontSize: '10px', margin: 0}}>
                                <p>Valores de Referencia: : &nbsp; &nbsp;&nbsp;</p>
                                <p>Normal: hasta 150mg/dl : &nbsp; &nbsp;&nbsp;</p>
                                <p>Riesgo moderado: 150-199 mg/dl : &nbsp; &nbsp;&nbsp;</p>
                                <p>Elevado: 200 - 499 mg/dl : &nbsp; &nbsp;&nbsp;</p>
                                <p>Muy elevado: mayor de 500 mg/dl :</p></td>
                            <td>03/05/2022</td>
                        </tr>
                        
                    
                    </tbody>
                </Table>
            </TableContainer>
        </ResultContainer>
    )
}