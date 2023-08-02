import React, { useContext, useEffect } from 'react'
import './list.css'
import { ContextApi } from '../../context/ContextApi'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import Loading from '../Loading'

const List = () => {
  const { tasks, getTasks, loading, editTask, deleteTask } = useContext(
    ContextApi,
  )
  // console.log(tasks)

  useEffect(() => {
    getTasks()
  }, [])
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <table className="taskList">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>
                <span>Edit</span>
              </th>
              <th>
                <span>Delete</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks?.map(({ id, task, status }) => {
              return (
                <tr key={id}>
                  <td>{task}</td>
                  <td>{status}</td>
                  <td>
                    <span onClick={() => editTask(id)}>
                      <FiEdit size={30} />
                    </span>
                  </td>
                  <td>
                    <span>
                      <MdOutlineDeleteForever
                        onClick={() => deleteTask(id)}
                        size={30}
                      />
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default List
