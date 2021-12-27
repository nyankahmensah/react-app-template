import { gql, useMutation } from '@apollo/client'
import { SignupForm } from 'components'
import { FC } from 'react'

interface SignupContainerProps {

}

const SIGNUP_M = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`;

const SignupContainer: FC<SignupContainerProps> = () => {

  const [mutate, { loading }] = useMutation(SIGNUP_M, {

  })

  const onSubmit = (values: any) => {
    // hit apollo
    mutate({
      variables: {
        input: values
      }
    })
    // handle toasts and stuff here
  }

  return (
    <SignupForm
      onSubmit={onSubmit}
      submitLoading={loading}
    />
  )
}

export default SignupContainer