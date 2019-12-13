
# react-apollo-notifications

> Notification component that takes a GraphQL subscription query

[![NPM](https://img.shields.io/npm/v/react-apollo-notifications.svg)](https://www.npmjs.com/package/react-apollo-notifications) 
[![Build Status](https://travis-ci.org/crofoot/react-apollo-notifications.svg?branch=master)](https://travis-ci.org/crofoot/react-apollo-notifications)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[<img src="https://img.youtube.com/vi/err4uJzE0YA/maxresdefault.jpg">](https://youtu.be/err4uJzE0YA)

## Install

```bash
npm install --save react-apollo-notifications
```

## Usage
* Clone [apollo-subscription-server](https://github.com/crofoot/apollo-subscription-server) to set up an apollo server with subscriptions 
* `npm install --save react-apollo-notifications` to your react project  
* Calling Notifications 
```jsx
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
        titleProperty='title' 
        messageProperty='message' 
      />
    </ApolloProvider>
  )

}
```

## Notes
* [Click here for example](https://github.com/crofoot/react-apollo-notifications/tree/master/example)
* <strong>react-apollo-notifications</strong> makes use of <strong>react-notifications-component</strong> so the props are identical


## Props Details

| Name | Type | Options | Default |
| ------------- |:-------------:|:---------------|:---------:|
| subscription (required) | any | `gql(subscription_query)` | none (required) |
| titleProperty | string | (property on graphql query) | if not specified 'Alert' will be there|
| messageProperty (required) | string |  (property on graphql query) | |
| duration | number |(in milliseconds) | 4000 |
| notificationStyle | NotificationStyle | | |
| notificationStyle.position | string | 'top-left' 'top-right', 'top-center', 'bottom-left','bottom-right' 'bottom-center' | 'top-right' |
| NotificationStyle.type | string | 'success', 'danger', 'info', 'default', 'warning' | 'info' |
| NotificationStyle.animationIn | string | Any animate.css class [Options Here!](https://github.com/daneden/animate.css#animations) | 'fadeInRight' |
| NotificationStyle.animationOut | string | Any animate.css class [Options Here!](https://github.com/daneden/animate.css#animations) | 'fadeOut' |


## Roadmap
* Custom Component
* More flexibility to default component
  * Onclick event
  * Custom background and text color


## License

MIT © [Dominic Crofoot](https://github.com/crofoot)
