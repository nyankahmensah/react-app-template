import { TextInput } from 'components/core'
import { useFormik } from 'formik'
import { FC } from 'react'
import { Link } from 'react-location'
import { ResetPasswordInitialValues, ResetPasswordSchema } from './schema'

interface ResetPasswordFormProps {
  initialValues?: typeof ResetPasswordInitialValues;
  onSubmit: (values: typeof ResetPasswordInitialValues) => void;
  submitLoading: boolean;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({initialValues, onSubmit}) => {

  const {handleSubmit, handleReset, resetForm ,...form} = useFormik({
    initialValues: initialValues??ResetPasswordInitialValues,
    validationSchema: ResetPasswordSchema,
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
        </div>

        <div className="text-sm">
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Remember your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send reset
        </button>
      </div>
    </form>
  )
}

export default ResetPasswordForm