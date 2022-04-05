import * as yup from 'yup';

export const schema = yup.object().shape({
    'ccid': yup.string().required(),
    'password': yup.string().required().min(5)
})

export default schema;