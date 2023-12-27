import { useQuery } from '@apollo/client'
import { useState } from 'react'
import PersonForm from './coponents/PersonForm'
import { ALL_PERSONS } from './queries'
import PhoneForm from './coponents/PhoneForm'
import Persons from './coponents/Persons'


const App = () => {
  const [errorMessage,  setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 60000   // update every 60 seconds
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.loading) {
    return <div>loading...</div>
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