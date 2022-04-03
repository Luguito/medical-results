import styled from 'styled-components';
import { SecondaryGreyColor } from '@global-colors';

export const UserLoggedContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-top: 3em;
`;

export const ProfileImgContainer = styled.div`
    height: 5em;
    width: 5em;
    background-color: ${SecondaryGreyColor};
    border-radius: 50%
`

export const UserName = styled.p`
    color: white;
`