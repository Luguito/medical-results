import styled from 'styled-components';
import { ButtonGrey } from '@global-styled';
import { PrimaryGreyColor } from '@global-colors';

export const ContainerFilters = styled.section`
    display: flex;
    width: 100%;
    background-color: #FFF;
    height: 30%;
    margin-bottom: 2em;
    border-radius: 10px;
    align-items: center;
`

export const ContainerFilter = styled.label`
    margin-left: 2em;
    margin-bottom: 1em;
    color: #818181;
`

export const ContainerInputs = styled.div`
    display: flex;
    gap: 2em;
`

export const SearchButton = styled(ButtonGrey)`
    && {
        background-color: ${PrimaryGreyColor};
        margin-top: 2em;
        margin-left: 3em;
    }
`