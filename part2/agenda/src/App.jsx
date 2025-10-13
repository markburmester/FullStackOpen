
import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons.js'

import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import Display from './components/Display'
import Notification from './components/Notification.jsx'



const App = () => {
  

  
  const [persons, setPersons] = useState([])
  const [searchedPersons, setSearchedPersons] = useState([])
  const [message, setMessage] = useState({message: null, type: null})
  
  
  useEffect(() => {
    
    personServices
      .getAll()
      .then(initialPersons => {
        
        setPersons(initialPersons)
        setSearchedPersons(initialPersons)
      })
  }, [])
 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  

  const addPerson = (event) =>{
    event.preventDefault()
    const repeatedPersons = persons.filter((x) => x.name === newName)

    //New Person
    if (repeatedPersons.length === 0){
      const personObject = {id:String(persons.length +1), name: newName, number: newNumber}
      personServices
        .create(personObject)
        .then(returnedPerson => {
         
          setPersons(persons.concat(returnedPerson))
          if (search.length===0){
            setSearchedPersons(persons.concat(returnedPerson))
          }
          setNewName('')
          setNewNumber('')
          const newMessage = {message:`${returnedPerson.name} added`, type:'message'}
          setMessage(newMessage)
          setTimeout(() => {setMessage({message:null, type:null})}, 5000)
        })      
    }

    //Repeated Person
    else{
      const repeatedPerson = repeatedPersons[0]
      
      const updatedPersonObject = {id: repeatedPerson.id, name: repeatedPerson.name, number: newNumber}
      
      if (window.confirm(`${newName} is already added, replace the old number with a the new one?`)){
        
        personServices
          .update(repeatedPerson.id, updatedPersonObject)
          .then((returnedPerson) => {
            const newPersons = [...persons]
            
            newPersons[returnedPerson.id - 1] = updatedPersonObject
            
            setPersons(newPersons)
            if (search.length===0){
              setSearchedPersons(newPersons)
            }
            const newMessage = {message:`${returnedPerson.name} added`, type:'message'}
            setMessage(newMessage)
            setTimeout(() => {setMessage({message:null, type:null})}, 5000)
            setNewName('')
            setNewNumber('')

          })
        .catch(error=>{
          console.log("caca")
          const newMessage = {message:`${repeatedPerson.name} has already been removed from server, reload and try again`, type:'error'}
          setMessage(newMessage)
          setTimeout(() => {setMessage({message:null, type:null})}, 5000)
            
        })
            
        }
          
      }
    
    
  }

  const handleNameChange = (event) =>{
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    event.preventDefault()
    setSearch(event.target.value)
    setSearchedPersons(persons.filter((x)=>x.name.toLowerCase().includes(event.target.value)))
  }

  const handleDeleteClick = (deletedPerson) => {   
    if (window.confirm(`Delete ${deletedPerson.name}?`)){
    personServices
      .erase(deletedPerson.id)
      .then((returnedPerson) => {
        setPersons(persons.filter((x)=>x.id != returnedPerson.id))
        setSearchedPersons(searchedPersons.filter((x)=>x.id != returnedPerson.id))
      })}
  
  }
    
  

  return (
    
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.message} type={message.type}/>
      <Filter searchValue={search} onSearchChange={handleSearchChange}/>
      
      <h2>Add a new</h2>

      <AddPerson onSubmit={addPerson} 
        nameValue={newName} 
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <Display array={searchedPersons} handleDeleteClick={handleDeleteClick}/>
      
    </div>
  )
}

export default App