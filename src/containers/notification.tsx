import { gql, useSubscription } from '@apollo/client'
import NotificationComponent from 'components/layouts/toaster';
import { FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NotificationContainerProps {

}

const SUBSCRIBE_NOTIFICATION = gql`
  subscription NewNotification {
    notification: newNotification {
      _id
      title
      description
      data
    }
  }
`;

const NotificationContainer: FC<NotificationContainerProps> = ({ }) => {
  const { data } = useSubscription(SUBSCRIBE_NOTIFICATION, {
    variables: {
      filter: {

      }
    },
    onSubscriptionData: (data) => {
      toast(JSON.stringify({trip: "hello"}))
    }
  })

  useEffect(() => {
    if(data) {
      toast(data?.notification)
    }
  }, [data])

  return (
    <>
      <NotificationComponent />
    </>
  )
}

export default NotificationContainer