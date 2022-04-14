import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import { ContainerFilters, ContainerFilter, ContainerInputs } from './filter-date.styled';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from "@mui/material";

export const FilterDate = () => {
    const [date, setDate] = useState({ start: '', end: '' });
    return (
        <ContainerFilters>
            <ContainerFilter>
                <p>Rango de fechas</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ContainerInputs>
                        <DatePicker
                            label="Start"
                            value={date.start}
                            onChange={(newValue) => { setDate({ ...date, start: newValue as string }); }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                        <DatePicker
                            label="End"
                            value={date.start}
                            onChange={(newValue) => { setDate({ ...date, start: newValue as string }); }}
                            renderInput={(params) => <TextField {...params} size="small" />}
                        />
                    </ContainerInputs>
                </LocalizationProvider>
            </ContainerFilter>
            <ContainerFilter>
                <p>Tipo de Examen</p>
                <TextField size="small"></TextField>
            </ContainerFilter>
        </ContainerFilters> 
    )
}

export default FilterDate