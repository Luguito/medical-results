import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import { ContainerFilters, ContainerFilter, ContainerInputs } from './filter-date.styled';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from "@mui/material";
import { ButtonGrey } from "@global-styled";

export const FilterDate = ({ fn }: { fn: (args: any) => void }) => {
    const [filter, setFilter] = useState({ startDate: '', endDate: '', nomProc: '' });

    const searchFilter = () => {
        fn(filter)
    }

    return (
        <ContainerFilters>
            <ContainerFilter>
                <p>Tipo de Examen</p>
                <TextField size="small" onChange={(e) => setFilter({ ...filter, nomProc: e.target.value })}></TextField>
            </ContainerFilter>
            <ContainerFilter>
                <p>Rango de fechas</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ContainerInputs>
                        <DatePicker
                            label="Fecha Inicial"
                            value={filter.startDate}
                            onChange={(newValue) => { setFilter({ ...filter, startDate: new Date(newValue as unknown as Date).toISOString().split('T')[0] as string }); }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                        <DatePicker
                            label="Fecha Final"
                            value={filter.endDate}
                            onChange={(newValue) => { setFilter({ ...filter, endDate: new Date(newValue as unknown as Date).toISOString().split('T')[0] as string }); }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                    </ContainerInputs>
                </LocalizationProvider>
            </ContainerFilter>
            <ButtonGrey style={{ marginTop: '2em', marginLeft: '3em' }} onClick={searchFilter}>Buscar</ButtonGrey>
        </ContainerFilters>
    )
}

export default FilterDate