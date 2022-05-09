import { ContainerFilters, ContainerFilter, SearchButton, Container, ContainerInputs } from './filters.styled';
import { InputAdornment, TextField } from "@mui/material";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export const FiltersInput = ({ fields, fn, modal }: { fields: string[] | undefined, fn: any, modal?: any }) => {
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
            <ContainerInputs>
                <Container>
                    {(fields as string[]).map((item, key) => {
                        return (
                            <ContainerFilter key={key}>
                                {/* @ts-ignore */}
                                <TextField InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    // @ts-ignore
                                }} size="small" label={item} onChange={({ target }) => handleForm(target.value, types[item])}></TextField>
                            </ContainerFilter>
                        )
                    })}
                    <SearchButton onClick={() => fn({ ...form, page: 1 })}>Buscar</SearchButton>
                </Container>
                {modal ?
                    <Container style={{ marginTop: '1em' }}>
                        <SearchButton startIcon={<AddIcon />} onClick={modal.fn}>{modal?.name}</SearchButton>
                    </Container>
                    :
                    null
                }
            </ContainerInputs>
        </ContainerFilters>
    )
}

export default FiltersInput;