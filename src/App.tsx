import ApolloProvider from 'apollo';
import LayoutProvider from 'layouts';
import RoutesProvider from 'router';

function App() {
  return (
    <ApolloProvider>
      <RoutesProvider>
        <LayoutProvider />
      </RoutesProvider>
    </ApolloProvider>
  );
}

export default App;
