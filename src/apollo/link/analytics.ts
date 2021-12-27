import { ApolloLink } from '@apollo/client';

const analyticsMiddleware = new ApolloLink((operation, forward) => {
  // Called before operation is sent to server
  operation.setContext({ startTime: new Date().getTime() });

  return forward(operation).map((data) => {
    // Called after server responds
    const time = new Date().getTime() - operation.getContext().startTime;
    console.log(`Operation ${operation.operationName} took ${time} to complete`);
    return data;
  });
});

export default analyticsMiddleware