import { useState, useEffect } from 'react';
import personServices from './services/persons';

import Search from './components/Search';
import Persons from './components/Persons';
import NumberForm from './components/NumberForm';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [changeMessage, setChangeMessage] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialResult => {
        setPersons(initialResult)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const checkName = persons.find(props => props.name.toLowerCase() === newPerson.name.toLowerCase())
    const changedPerson = { ...checkName, number: newNumber }

    if (checkName && checkName.number === newPerson.number) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (checkName && checkName.number !== newPerson.number) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        personServices
          .updatePerson(checkName.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== checkName.id ? n : returnedPerson))
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setChangeMessage(`number of ${newName} is changed`)
            }, 5000)
          })
          .catch(error => {
            setChangeMessage(`Information of ${newName} has already been removed from server`)
          })
      }
    }
    else {
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setChangeMessage(`Successfully added ${newName}`)
          setTimeout(() => {
            setChangeMessage(null)
          }, 5000)
        })
        .catch(error => {
          setChangeMessage(`[error] ${error.response.data.error}`)
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServices
        .getDeletePerson(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }

  }

  const handleNameChange = (event) => { setNewName(event.target.value) }

  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  const handleNewFilter = (event) => { setFilterName(event.target.value) }

  const filter = persons.map(props => props.name.toLowerCase().includes(filterName.toLowerCase())) ?
    persons.filter(props => props.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons


  return (
    <div>
      <h2>Phonebook </h2>
      <Notification message={changeMessage} />
      <Search setFilterName={setFilterName} value={filterName} handleNewChange={handleNewFilter} />
      <h2>Add a new number</h2>
      <NumberForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App