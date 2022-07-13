import * as yup from 'yup';

export const schema = yup.object().shape({
    'email': yup.string().required().email(),
    'password': yup.string().required(`El campo 'Contraseña' es requerido`).min(8, 'El campo de Contraseña debe tener una longitud de 8 caracteres, 1 mayuscula y 1 minuscula'),
    'repeatPassword': yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no coinciden!")
})

export default schema;