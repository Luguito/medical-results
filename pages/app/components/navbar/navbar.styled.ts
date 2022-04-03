import { PrimaryBlueColor, PrimaryGreyColor } from '@global-colors';
import {} from '@global-styled';
import styled from 'styled-components'
import Button from '@mui/material/Button';

export const ContainerNav = styled.nav`
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 2em;
`;

export const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Title = styled.p`
    font-weight: 600;
    font-size: 1.2rem;
    color: #000;
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