import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/0xnimrodel/web3-rsvp',
  cache: new InMemoryCache()
})

export default client;
