import { gql, useMutation } from '@apollo/client'
import { ResetPasswordForm } from 'components'
import { FC } from 'react'

interface ResetPasswordContainerProps {

}

const RESET_PASSWORD_M = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      token
    }
  }
`;

const ResetPasswordContainer: FC<ResetPasswordContainerProps> = () => {

  const [mutate, { loading }] = useMutation(RESET_PASSWORD_M, {

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
    <ResetPasswordForm
      onSubmit={onSubmit}
      submitLoading={loading}
    />
  )
}

export default ResetPasswordContainer