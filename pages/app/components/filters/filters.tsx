import { ContainerFilters, ContainerFilter, SearchButton} from './filters.styled';
import { TextField } from "@mui/material";
import { useState } from 'react';

export const FiltersInput = ({ fields, fn }: { fields: string[], fn: any }) => {
    const [form, setForm] = useState({});
    const types = {
        'Nombre': 'name',
        'Código cup': 'cup',
        'Cedula': 'cid',
        'Correo Electronico': 'cup'
    }

    const handleForm = (value: string, type: 'name' | 'cid' | 'email' | 'cup') => {
        setForm({ ...form, [type]: value });
    }

    return (
        <ContainerFilters>
            {fields.map(item => {
                return (
                    <ContainerFilter>
                        <p>{item}</p>
                        <TextField size="small" onChange={({ target }) => handleForm(target.value, types[item])}></TextField>
                    </ContainerFilter>
                )
            })}
            <SearchButton onClick={fn}>Buscar</SearchButton>
        </ContainerFilters>
    )
}

export default FiltersInput;