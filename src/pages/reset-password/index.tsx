import { ResetPasswordContainer } from "containers"
import { FC } from "react"

const ResetPasswordPage: FC = () => {

  return (

    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <img
          className="h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Submit your email to receive a temporary password
        </p>
      </div>

      <div className="mt-8">

        <div className="mt-6">
          <ResetPasswordContainer

          />
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage