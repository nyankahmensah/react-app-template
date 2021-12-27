import { SigninContainer } from "containers"
import { FC } from "react"
import { Link } from "react-location"

const LoginPage: FC = () => {

  return (

    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <img
          className="h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            signup as a partner
          </Link>
        </p>
      </div>

      <div className="mt-8">

        <div className="mt-6">
          <SigninContainer

          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage