import { TextInput } from 'components/core'
import { FC } from 'react'
import { Link } from 'react-location'
import { useFormik } from 'formik'
import { SignupInitialValues, SignupSchema } from './schema'

interface SignupFormProps {
  initialValues?: typeof SignupInitialValues;
  onSubmit: (values: typeof SignupInitialValues) => void;
  submitLoading: boolean;
}

const SignupForm: FC<SignupFormProps> = ({initialValues, onSubmit}) => {

  const {handleSubmit, handleReset, resetForm ,...form} = useFormik({
    initialValues: initialValues??SignupInitialValues,
    validationSchema: SignupSchema,
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
            By signing up, you agree to the  <Link to="/reset-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            Terms and Conditions
          </Link>
          </label>
        </div>

        <div className="text-sm">
          
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}

export default SignupForm