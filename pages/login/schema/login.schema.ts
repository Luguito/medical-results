import * as yup from 'yup';

export const schema = yup.object().shape({
    'identification_number': yup.string().required(),
    'password': yup.string().required()
})

export default schema;