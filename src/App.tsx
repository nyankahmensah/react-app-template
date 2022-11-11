import ApolloProvider from 'apollo';
import LayoutProvider from 'layouts';
import NotificationProvider from 'notifications';
import RoutesProvider from 'router';

function App() {
  return (
    <ApolloProvider>
      <NotificationProvider>
        <RoutesProvider>
          <LayoutProvider />
        </RoutesProvider>
      </NotificationProvider>
    </ApolloProvider>
  );
}

export default App;
