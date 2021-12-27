import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export const SigninInitialValues = {
  email: "",
  password: "",
}