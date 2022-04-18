import styled from 'styled-components';
import { ButtonGrey } from '@global-styled';
import { } from '@global-colors';

export const HeaderModal = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const OutlineButton = styled(ButtonGrey)`
    && {
        background-color: #FFF;
        color: #818181;
        border: 1px solid #818181;
        margin-right: 10px;
        font-size: 0.7rem;
    }
`
export const FullButton = styled(ButtonGrey)`
    && {
        padding: 0.7em 2em;
        background-color: #818181;
        font-size: 0.7rem;
    }
`
// Change height by real pdf
export const ContainerPDF = styled.section`
    height: 30em; 
    margin-top: 30px;
    overflow-y: scroll
`;