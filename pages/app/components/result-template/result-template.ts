import { display } from '@mui/system';
import styled from 'styled-components';

export const ResultContainer = styled.div`
    
        display: flex;
        flex-direction: column;
        width: 100%;
        padding:40px;
        margin-bottom: 60px


`
export const PreHeader = styled.div`
        width: 100%;
`

export const Header = styled.div`
        width: 100%;
        display: flex; 
        align-items: flex-start; 
        font-size: 12px;
`
export const HeaderBox = styled.div`
    width:50%
`
export const HeaderItem = styled.div`
    display:flex; 
    font-weight: bold; 
    margin: 10px 0;
    line-height: 10px;
`
export const ItemText = styled.div<{ withMargin?: boolean }>`
    margin:
    padding:0;
    margin: ${({withMargin}) => withMargin ? '0 20px 0 0' : '0'}
`

export const TableContainer = styled.div`
    margin-top: 2em;
    width: 100%;
`
export const Table = styled.table`
    width:100%; 
    text-align: left;
    font-size: 10px;
    border-collapse: collapse;
    & th {
        border-top: 2px solid #000; 
        border-bottom: 2px solid #000
    }
`
