import { createContext, useState } from 'react'
import axios from 'axios'

export const ContextApi = createContext(null)
const BaseUrl = import.meta.env.VITE_APP_URL
const ContextApiProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [updateTask, setUpdateTask] = useState('')
  const [loading, setLoading] = useState(false)
  // console.log(BaseUrl)
  const addTask = async (task) => {
    setLoading(true)
    const { data } = await axios.post(BaseUrl, task)
    getTasks()
    setLoading(false)
    console.log(data)
  }

  const getTasks = async (task) => {
    setLoading(true)
    const { data } = await axios.get(BaseUrl)
    setTasks(data)
    setLoading(false)
    // console.log(data)
  }

  const editTask = (id) => {
    const data = tasks.find((item) => item.id === id)
    setUpdateTask(data)
  }

  const updateTaskApi = async (updateData) => {
    setLoading(true)
    const { id } = updateData
    console.log(updateData)
    await axios.patch(`${BaseUrl}/${id}`, updateData)
    getTasks()
    setLoading(false)
  }

  const deleteTask =async(id) =>{
    setLoading(true)
    await axios.delete(`${BaseUrl}/${id}`);
    getTasks()
    setLoading(false)
}

  return (
    <ContextApi.Provider
      value={{
        addTask,
        loading,
        getTasks,
        tasks,
        updateTask,
        editTask,
        setUpdateTask,
        updateTaskApi,
        deleteTask
      }}
    >
      {children}
    </ContextApi.Provider>
  )
}

export default ContextApiProvider
