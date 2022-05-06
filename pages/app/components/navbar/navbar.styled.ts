import { PrimaryBlueColor, PrimaryGreyColor } from '@global-colors';
import {} from '@global-styled';
import styled from 'styled-components'
import Button from '@mui/material/Button';

export const ContainerNav = styled.nav`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const Container = styled.div`
    background-color: #FFF;
    width: 97%;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 2em;
`

export const ContainerText = styled.div`
    display: flex;
    align-items:center;
    gap: 10px;
`

export const Title = styled.p`
    font-weight: 600;
    font-size: 1.2rem;
    color: ${PrimaryBlueColor};
`

export const SubTitle = styled.small``

export const ButtonGrey = styled(Button)`
    && {
        background-color: ${PrimaryBlueColor};
        border-radius: 20px;
        color: #FFFFFF;
        padding: 0.5em;
        width: 15%
    }
`;