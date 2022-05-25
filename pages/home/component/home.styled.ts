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
    flex-wrap: wrap; 
    gap: 5em;
    // background:rgb(0, 175, 193);
    background:rgb(0, 141, 202);

`

export const Cards = styled.div`
    background:white;
    height: 468px;
    width: 20%;
    min-width:382px;
    border-radius:10px;
    box-shadow: 1px 4px 7px -3px;
    padding-top:20px;
    box-sizing: border-box;
`

export const ImgContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Imglab = styled.div`
    background-image:url(https://www.lgs-analisis.es/wp-content/uploads/2017/06/analisis-de-sangre.jpg);
    background-size: cover;
    height: 15em;
    width: 15em;
    border-radius: 50%;
    border:1px inset white;
`

export const Imgdiag = styled.div`
    background-image:url(https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/tac-tomografia-axial-computerizada.jpg);
    background-size: cover;
    height: 15em;
    width: 15em;
    border-radius: 50%;
    border:1px inset white;
`
export const TextContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
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
    margin-bottom: 20px;
`;
export const ButtonLink = styled(ButtonGrey)`
    && {
        background-color: red;
        color: white;
    }
`