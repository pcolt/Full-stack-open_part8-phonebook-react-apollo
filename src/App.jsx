import { useQuery } from '@apollo/client'
import { useState } from 'react'
import PersonForm from './coponents/personForm'
import { ALL_PERSONS, FIND_PERSON } from './queries'
import PhoneForm from './coponents/phoneForm'

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>{person.phone}</div>
      <div>{person.address.street} {person.address.city}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })
  if (nameToSearch && result.data) {
    return (
      <Person 
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)} 
      />
    )
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address 
          </button>
        </div>  
      )}
    </div>
  )
}

const App = () => {
  const [errorMessage,  setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 60000   // update every 60 seconds
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
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