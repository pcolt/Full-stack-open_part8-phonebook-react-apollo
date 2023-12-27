import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ApolloClient, ApolloProvider, InMemoryCache, gql, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allPersons  {
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`
console.log('query', query)

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
