import { SignupContainer } from "containers"
import { FC } from "react"
import { Link } from "react-location"

const SignupPage: FC = () => {

  return (

    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <img
          className="h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign up as a partner</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign into your partner account
          </Link>
        </p>
      </div>

      <div className="mt-8">

        <div className="mt-6">
          <SignupContainer

          />
        </div>
      </div>
    </div>
  )
}

export default SignupPage