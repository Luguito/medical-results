import styled from 'styled-components';
import { PrimaryBlueColor, PrimaryGreyColor } from './global-colors';
import Button from '@mui/material/Button';

export const ContainerCenter = styled.section`
    display: flex; 
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${PrimaryBlueColor};
`;

export const CardContainer = styled.article`
    background-color: #FFFFFF;
    min-width: 10em;
    min-height: 10em;
    color: ${PrimaryGreyColor};
`;

export const HeaderCard = styled.header`
    display: flex;
    margin-bottom: 1.5em;
`;

export const TitleCard = styled.label`
    display: flex;
    flex-direction: column;
`;

export const ContentCard = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

export const ItemCard = styled.label`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const FooterCard = styled.article`
    display: flex;
    align-items: center;
    margin-top: 2em;
`

export const ButtonGrey = styled(Button)`
    && {
        background-color: ${PrimaryGreyColor};
        border-radius: 20px;
        color: #FFFFFF;
    }
`