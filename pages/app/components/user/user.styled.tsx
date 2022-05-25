import styled from 'styled-components';
import { SecondaryGreyColor } from '@global-colors';

export const UserLoggedContainer = styled.section`
    display: flex;
    align-items: center;
    gap: 2em;
    color: #717171;
    padding: 10px 0;
    box-sizing: border-box;
`;

export const ProfileImgContainer = styled.div`
    height: 5em;
    width: 5em;
    // background-color: ${SecondaryGreyColor};
    border-radius: 50%;
    overflow: hidden;
    position:relative;
`

export const UserName = styled.span`
    font-weight:500;
`

export const UserProperties = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em
`

export const ImageProfile = styled.img`
    width:160%;
    position: absolute;
    left: -29%;

`