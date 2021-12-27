import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export const SignupInitialValues = {
  email: "",
  password: "",
}