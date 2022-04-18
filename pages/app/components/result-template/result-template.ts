import { display } from '@mui/system';
import styled from 'styled-components';

export const ResultContainer = styled.div`
    // @media print {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top:40px;
        margin-bottom: 60px
        color-adjust: exact;
        -webkit-print-color-adjust: exact;
    // }
`
export const PreHeader = styled.div`
    // @media print {
        width: 100%;
        color-adjust: exact;
        -webkit-print-color-adjust: exact;
    // }
`

export const Header = styled.div`
    // @media print {
        color-adjust: exact;
        -webkit-print-color-adjust: exact;
        width: 100%;
        display: flex; 
        align-items: flex-start; 
        font-size: 12px;
    // }
`
export const HeaderBox = styled.div`
    width:50%
`
export const HeaderItem = styled.div`
    display:flex; 
    font-weight: bold; 
    margin: 10px 0;
`
export const ItemText = styled.div<{ withMargin?: boolean }>`
    margin:
    padding:0;
    margin: ${({withMargin}) => withMargin ? '0 20px 0 0' : '0'}
`

export const TableContainer = styled.div`
    width: 100%;
`
export const Table = styled.table`
    width:100%; 
    text-align: left;
    font-size: 10px;
    & th {
        border-top: 2px solid #000; 
        border-bottom: 2px solid #000
    }
`
