import styled from 'styled-components';
import { LayoutColor, ItemListColor } from '@global-colors';

export const ContainerLayout = styled.section`
    display: flex;
    height: 100%;
`
export const Layout = styled.section`
    background-color: ${LayoutColor};
    color: #FFF;
    height: 100%;
    width: 15%;
`

export const OptionLists = styled.ul`
    padding: 1em 0.5em;
`;

export const ItemList = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
    padding: 10px 10px;
    font-size: 0.7rem;
    
    &:hover {
        background: ${ItemListColor};
        font-weight: 600;
        border-radius: 10px;
        padding-left: 10px;
    }
`