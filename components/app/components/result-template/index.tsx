import react, { FC, useEffect, useState } from 'react';
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
    const { print, data } = props

    const [header, setHeader] = useState<any>({})
    // let header: any = {};
    useEffect(() => {
        // header = data[0];
        setHeader(data[0]);
    }, [data])

    




    return (
        <>
            {data && header &&
                <ResultContainer id="printable">
                    <PreHeader>
                        <img style={{ marginLeft: '-16px' }} width="200" src="/logo.png" alt="" />
                    </PreHeader>
                    <Header>
                        <HeaderBox style={{width: '70%'}}>
                            {console.log(data)}
                            <HeaderItem>
                                <ItemText withMargin>PACIENTE</ItemText>
                                <ItemText>{header.MPNOMC}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>INGRESO</ItemText>
                                <ItemText>{new Date(header.HCMINFECH)?.toLocaleDateString()}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>MÉDICO</ItemText>
                                <ItemText>{header.MMNOMM?.toUpperCase()}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>TIPO DE DOCUMENTO</ItemText>
                                <ItemText>{header.MPTDOC}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>No. DOCUMENTO</ItemText>
                                <ItemText>{header.MPDIRE}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>TELÉFONO</ItemText>
                                <ItemText>{header.MPTELE}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>SEDE</ItemText>
                                <ItemText>{header.SEDE}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>EMPRESA</ItemText>
                                <ItemText></ItemText>
                            </HeaderItem>
                        </HeaderBox>
                        <HeaderBox>
                            <HeaderItem>
                                <ItemText withMargin>FACTURA</ItemText>
                                <ItemText>{header.HCCNSFAC}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>EDAD</ItemText>
                                <ItemText>{header.AGE} AÑOS</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>SEXO</ItemText>
                                <ItemText>{header.MPSEXO}</ItemText>
                            </HeaderItem>
                            <HeaderItem>
                                <ItemText withMargin>FECHA DE NACIMIENTO</ItemText>
                                <ItemText>{new Date(header.MPFCHN)?.toLocaleDateString()}</ItemText>
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
                                    <th>Intervalo Biológicos de Referencia</th>
                                    <th>Fecha Validación</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    data.length ?
                                        data.map((row: any, index: number) => {
                                            const labName = row.HCDSCATR?.split(':')[0];
                                            const resultValue = row.HCDSCATR?.split(':')[2]?.split(/\n/)[0]?.trim();
                                            const referenceValue = row.HCDSCATR?.split(/\n/)[1]?.trim();
                                            const arrayValues: any[] = [];
                                            const arrayReferences: any[] = [];
                                            if(!resultValue && resultValue != undefined){
                                                const rows = row.HCDSCATR?.split(/\n/);
                                                rows.map((row: any, i: number) => {
                                                    if(i > 0){
                                                        const line = row?.split('     ');
                                                        arrayValues.push(line[0])
                                                        arrayReferences.push(line[1])
                                                    }
                                                })

                                            } 
                                            
                                            return(
                                                <tr key={index}>
                                                    <td ><p>{labName} : &nbsp; &nbsp;&nbsp;</p>

                                                    </td>
                                                    <td style={{ fontWeight: 'bold' }}>
                                                        { 
                                                            resultValue ? <p>{ resultValue }</p> : arrayValues.map((value: any) => {
                                                                return(
                                                                    <p>{value}</p>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                    <td></td>
                                                    <td style={{ fontSize: '10px', margin: 0 }}>
                                                        { 
                                                            resultValue ? <p>{referenceValue} &nbsp; &nbsp;&nbsp;</p> : arrayReferences.map((value: any) => {
                                                                return(
                                                                    <p>{value}</p>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </td>
                                                    <td>{new Date(header.HCFECHRES).toLocaleString()}</td>
                                                </tr>
                                            )
                                        })
                                    : '' 
                                }
                            </tbody>
                        </Table>
                    </TableContainer>
                </ResultContainer>
            }
        </>
    )
}