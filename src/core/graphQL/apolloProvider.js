import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: process.env.GRAPHQL_PUBLIC_API
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export { apolloProvider as default }
