import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import { ContainerFilters, ContainerFilter, ContainerInputs } from './filter-date.styled';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from "@mui/material";

export const FilterDate = () => {
    const [filter, setFilter] = useState({ startDate: '', endDate: '', nomProc: ''});

    return (
        <ContainerFilters>
            <ContainerFilter>
                <p>Tipo de Examen</p>
                <TextField size="small"></TextField>
            </ContainerFilter>
            <ContainerFilter>
                <p>Rango de fechas</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ContainerInputs>
                        <DatePicker
                            label="Fecha Inicial"
                            value={filter.startDate}
                            onChange={(newValue) => { setFilter({ ...filter, startDate: newValue as string }); }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                        <DatePicker
                            label="Fecha Final"
                            value={filter.endDate}
                            onChange={(newValue) => { setFilter({ ...filter, endDate: newValue as string }); }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                    </ContainerInputs>
                </LocalizationProvider>
            </ContainerFilter>
        </ContainerFilters> 
    )
}

export default FilterDate