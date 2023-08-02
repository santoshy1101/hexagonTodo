import React, { useContext, useEffect, useState } from 'react'
import './inputTask.css'
import { ContextApi } from '../../context/ContextApi'

const taskObject = {
  task: '',
  status: '',
}

const InputTask = () => {
  const [formtask, setFormTask] = useState(taskObject)
  const { addTask, updateTask, setUpdateTask, updateTaskApi } = useContext(
    ContextApi,
  )

  const changeHandler = (e) => {
    const { value, name } = e.target
    setFormTask({ ...formtask, [name]: value })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (updateTask) {
      updateTaskApi(formtask)
      alert('data upadted')
      setFormTask(taskObject)
      setUpdateTask('')
    } else {
      addTask(formtask)
      setFormTask(taskObject)
      alert('form submited')
    }
  }

  useEffect(() => {
    if (updateTask) {
      setFormTask(updateTask)
    }
  }, [updateTask])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div className="task">
          <label htmlFor="task">Enter Task</label>
          <input
            minLength={5}
            required
            autoComplete="off"
            onChange={changeHandler}
            type="text"
            id="task"
            name="task"
            value={formtask.task}
            placeholder="Enter Task"
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={formtask.status}
            required
            onChange={changeHandler}
          >
            <option value="">Select Status</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default InputTask
