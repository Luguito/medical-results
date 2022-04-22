import * as yup from 'yup';

export const schema = yup.object().shape({
    'email': yup.string().required().email(),
    'password': yup.string().required(`El campo 'Contraseña' es requerido`).min(8, 'Tiene que tener mas de 8 caracteres'),
    'repeatPassword': yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no coinciden!")
})

export default schema;