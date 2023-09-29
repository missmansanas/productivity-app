import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TodoItem = ({item, toggleCompleted, deleteTodo, editTodo}) => {
  const { id, task } = item;
  const [completed, setCompleted] = useState(item.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const navigate = useNavigate();

  const handleCompleted = () => {
    setCompleted(!completed);
    toggleCompleted(id);
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const saveEdit = () => {
    setIsEditing(false);
    editTodo(id, editedTask);
  }

  const focusOnTask = () => {
    navigate('/pomodoro', { state: { focusTask: task } })
  }

  return (
    <li className='w-full flex flex-row justify-between items-center py-1 text-lg font-light transition-all duration-300'>
      <div className='w-full flex flex-row items-center'>
        {completed ?
          <MdCheckBox 
            onClick={() => handleCompleted()}
            className='cursor-pointer text-black/20'
            />
          :
          <MdCheckBoxOutlineBlank
            onClick={() => handleCompleted()}
            className='cursor-pointer text-black/20 hover:text-black duration-300 rounded'
            />
        }
        {isEditing ? (
        <>
          <input
            type='text'
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={saveEdit}
            autoFocus
            className='
              px-1 mx-3 w-full
              focus:outline focus:outline-1 focus:outline-sky-200 focus:bg-white focus:text-black
              transition-all duration-300
              '
          />
        </>
        ) : (
          <>
            <span
              className={completed ? 'w-full px-1 mx-3 line-through text-black/20 cursor-text duration-300' : 'w-full px-1 mx-3 cursor-text duration-300'}
              onClick={() => handleEdit()}
            >
              {item.task}
            </span>
          </>
        )}
      </div>
        <AiOutlineDelete className='text-black/20 hover:text-black/70 duration-300 cursor-pointer' onClick={() => deleteTodo(id)}/>
        <MdOutlineTimer className='text-black/20 hover:text-black/70 duration-300 cursor-pointer' onClick={focusOnTask} />
    </li>
  )
}

export default TodoItem