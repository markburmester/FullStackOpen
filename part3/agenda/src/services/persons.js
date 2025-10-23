import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject)  
  return request.then(response => response.data)
}

const erase = (id) => {
    const request = axios.delete(`${baseUrl}/${id}` , id)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
  
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
    
  }


export default {create, getAll, erase, update}