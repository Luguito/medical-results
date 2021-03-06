import styled from 'styled-components';
import { ButtonGrey } from '@global-styled';
import { PrimaryBlueColor } from '@global-colors';
import Switch from '@mui/material/Switch';

export const HeaderModal = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e3e3;
`
export const OutlineButton = styled(ButtonGrey)`
    && {
        background-color: #FFF;
        color: ${PrimaryBlueColor};
        border: 1px solid ${PrimaryBlueColor};
        margin-right: 10px;
        font-size: 0.7rem;
    }
`
export const FullButton = styled(ButtonGrey)`
    && {
        padding: 0.7em 2em;
        background-color: ${PrimaryBlueColor};
        font-size: 0.7rem;
    }
`
// Change height by real pdf
export const ContainerPDF = styled.section`
    height: 30em; 
    margin-top: 30px;
    overflow-y: scroll
`;

export const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 950px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
    padding: 32px;
`;

export const CenterUpdated = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2em
    padding-bottom: 2em
`;

export const CustomSwitch = styled(Switch)`
&& {
    .MuiSwitch-switchBase: {
        margin: 1,
        padding: 0,
        '&.Mui-checked': {
          color: ${PrimaryBlueColor},
          transform: 'translateX(22px)',
        MuiSwitch-track: {
            opacity: 1,
            backgroundColor: ${PrimaryBlueColor},
          },
        },
      },
}
`

export const PrintContiner = styled.div`
@media all {
    .page-break {
      display: none;
    }
  }
  
  @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
      color: black;
    }
  }
  
  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: none;
    }
  }
  
  @page {
    size: 300mm 400mm;
    margin: 5mm  ;
  }
`