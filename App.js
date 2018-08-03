//packages
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

import { getToken } from './loginUtils';

//screens
import Navigator from './Navigator';

const authLink = setContext(async(req, { headers }) => {
  const token = await getToken();
  return {
    
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjj6n7i8324jh01979sb4fsxl' });

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class App extends React.Component {

  render() {
    
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}


