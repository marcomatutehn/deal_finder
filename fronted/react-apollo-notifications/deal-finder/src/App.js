import React from 'react';
import DemoApp from "./DemoApp";

// GraphQL boilerplate imports
import gql from 'graphql-tag';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Notifications } from 'react-apollo-notifications';

const NS = gql`
  subscription {
    subscribeToNotifications{
      message
      date
      title
    }
  }
`;

export default function App() {
  const uri = 'ws://localhost:4000/graphql';

  // Create an http link:
  const httpLink = new HttpLink({ uri });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri,
    options: {
      reconnect: true
    }
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  return (
    <ApolloProvider client={client}>
      <DemoApp />
      <Notifications
        subscription={NS}
        messageProperty='message'
        titleProperty='title'
        duration={1000}
        notificationStyle={{
          animationIn:'rotateIn',
          animationOut:'rotateOutUpRight',
          position:'top-center',
          type:'warning'
        }}
      />
    </ApolloProvider>
  )

}

