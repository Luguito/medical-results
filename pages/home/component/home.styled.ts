import styled from 'styled-components';
import { ButtonGrey } from '@global-styled';
export const ContainerLanding = styled.section`
    height: 100%;
    width:100%;
    background-color: white;
`;

export const ContainerCars = styled.section`
    height: 100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5em;

`

export const Cards = styled.div`
    height: 70%;
    width: 20%;
    border-radius:10px;
    box-shadow: 1px 4px 7px -3px;
`

export const ImgContainer = styled.div`
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Imgs = styled.div`
    height: 10em;
    width: 10em;
    border-radius: 50%;
    border:1px inset white;
`
export const TextContent = styled.div`
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Text = styled.p`
    text-align: center;
    padding: 1em;
    font-size: 0.9rem;
`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ButtonLink = styled(ButtonGrey)`
    && {
        background-color: red;
        color: white;
    }
`