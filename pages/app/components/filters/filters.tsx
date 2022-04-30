import { ContainerFilters, ContainerFilter, SearchButton} from './filters.styled';
import { TextField } from "@mui/material";
import { useState } from 'react';

export const FiltersInput = ({ fields, fn }: { fields: string[], fn: any }) => {
    const [form, setForm] = useState({});
    const types = {
        'Nombre': 'fullname',
        'Código cup': 'cup',
        'Cedula': 'ccid',
        'Correo electronico': 'email',
        'Perfil': 'profileName'
    }

    const handleForm = (value: string, type: 'fullname' | 'ccid' | 'email' | 'cup') => {
        setForm({ ...form, [type]: value });
    }

    return (
        <ContainerFilters>
            {fields.map((item, key) => {
                return (
                    <ContainerFilter key={key}>
                        <p>{item}</p>
                        {/* @ts-ignore */}
                        <TextField size="small" onChange={({ target }) => handleForm(target.value, types[item])}></TextField>
                    </ContainerFilter>
                )
            })}
            <SearchButton onClick={() => fn(form)}>Buscar</SearchButton>
        </ContainerFilters>
    )
}

export default FiltersInput;