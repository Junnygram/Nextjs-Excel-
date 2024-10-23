// validationSchema.ts
import * as yup from 'yup';

export const formSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  lastName: yup.string().required('Last name is required'),
  type: yup.string().required('Profile type is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  comment: yup.string().required(),
});
