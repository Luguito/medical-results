import styled from 'styled-components';

export const ContainerTable = styled.section`
    height: 70%;
    overflow: scroll;
    padding: 0 2em;
    background-color: #FFF;
    border-radius: 10px;
`;
export const Table = styled.table`
    width: 100%;
    // height: 100%;
    background-color: #FFF;
    // border-radius: 10px;
    border-collapse: collapse;
`;

export const RowTable = styled.tr``;

export const HeaderTable = styled.th`
    padding-bottom: 1em;
    padding-top: 1em;
    border-bottom: 1px solid #bcbcbc;
    font-weight: 400;
`;

export const ItemTable = styled.td`
    text-align: center;
    border-bottom: 0.1px solid #bcbcbc;
    padding-bottom: 1em;
    padding-top: 1em;
`;

export const FooterTable = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2em;
    background-color: #FFF;
    border-radius: 0 0 10px 10px;
`

export const Container = styled.div`
    padding: 1em;
    background-color: white;
`