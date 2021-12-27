import { gql, useMutation } from '@apollo/client'
import { setAuth } from 'apollo/cache/auth';
import { SigninForm } from 'components'
import { FC } from 'react'
import { useNavigate, useSearch } from 'react-location';
import { LocationGenerics } from 'router/location';

interface SigninContainerProps {

}

const SIGNIN_M = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      token
    }
  }
`;

const SigninContainer: FC<SigninContainerProps> = () => {

  const search = useSearch<LocationGenerics>()
  const navigate = useNavigate()
  const [mutate, { loading }] = useMutation(SIGNIN_M, {

  })

  console.log("Search", search)

  const onSubmit = (values: any) => {
    // override auth
    setAuth({
      user: {},
      token: "this-is-a-dummy-token"
    })
    return navigate({
      replace: true,
      to: search?.redirect??"/"
    })

    // hit apollo
    mutate({
      variables: {
        input: values
      }
    })
    // handle toasts and stuff here
  }

  return (
    <SigninForm
      onSubmit={onSubmit}
      submitLoading={loading}
    />
  )
}

export default SigninContainer