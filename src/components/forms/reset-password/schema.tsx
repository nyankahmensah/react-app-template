import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export const ResetPasswordInitialValues = {
  email: "",
  password: "",
}