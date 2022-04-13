import * as yup from 'yup';

export const schema = yup.object().shape({
    'ccid': yup.string().required(),
    'password': yup.string().required(`El campo 'Contraseña' es requerido`).min(8, 'Tiene que tener mas de 8 caracteres'),
    // .matches(/((?=.*[A-Z]){1})[a-z]/, "Debe tener al menos una mayuscula")
})

export default schema;