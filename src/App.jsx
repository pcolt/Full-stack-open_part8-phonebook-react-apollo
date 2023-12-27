import { useQuery, useApolloClient } from '@apollo/client'
import { useState } from 'react'

import PersonForm from './coponents/PersonForm'
import PhoneForm from './coponents/PhoneForm'
import Persons from './coponents/Persons'
import LoginForm from './coponents/LoginForm'

import { ALL_PERSONS } from './queries'


const App = () => {
  const [errorMessage,  setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 60000   // update every 60 seconds
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm 
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage) {
    return null
  } 
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App