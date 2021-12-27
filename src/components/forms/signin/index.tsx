import { TextInput } from 'components/core'
import { useFormik } from 'formik'
import { FC } from 'react'
import { Link } from 'react-location'
import { SigninInitialValues, SigninSchema } from './schema'

interface SigninFormProps {
  initialValues?: typeof SigninInitialValues;
  onSubmit: (values: typeof SigninInitialValues) => void;
  submitLoading: boolean;
}

const SigninForm: FC<SigninFormProps> = ({initialValues, onSubmit}) => {

  const {handleSubmit, handleReset, resetForm ,...form} = useFormik({
    initialValues: initialValues??SigninInitialValues,
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      onSubmit(values)
    }
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <TextInput
          id="email"
          label="Email address"
          type="email"
          {...form}
        />
      </div>

      <div className="space-y-1">
        <TextInput
          id="password"
          label="Password"
          type="password"
          {...form}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link to="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

export default SigninForm