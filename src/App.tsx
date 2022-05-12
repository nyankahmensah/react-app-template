import ApolloProvider from 'apollo';
import { NotificationContainer } from 'containers';
import LayoutProvider from 'layouts';
import RoutesProvider from 'router';

function App() {
  return (
    <ApolloProvider>
      <RoutesProvider>
        <LayoutProvider />
      </RoutesProvider>
      <NotificationContainer />
    </ApolloProvider>
  );
}

export default App;
