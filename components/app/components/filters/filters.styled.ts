import styled from 'styled-components';
import { ButtonGrey } from '@global-styled';
import { PrimaryGreyColor, PrimaryBlueColor } from '@global-colors';

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
    width: 100%;
`

export const ContainerInputs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 2em;
    width: 100%;
`
export const Container = styled.div`
    display: flex;
    align-items: flex-start;
`

export const SearchButton = styled(ButtonGrey)`
    && {
        background-color: ${PrimaryBlueColor};
        margin-left: 3em;
        padding: 5px 3em;
    }
`