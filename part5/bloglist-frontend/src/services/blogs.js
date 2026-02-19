import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.put(baseUrl+'/'+newBlog.id, newBlog, config)
  return response.data
}

const remove = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(baseUrl+'/'+newBlog.id, config)
  return response.data
}

export default { getAll, create, update, remove }