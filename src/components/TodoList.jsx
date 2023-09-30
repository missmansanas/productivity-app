import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import toast from 'react-hot-toast';
import { AiOutlineSave, AiOutlineFileAdd } from "react-icons/ai";

const TodoList = () => {
/**
 * Initialize states and refs
 * todolist - array of to-do items, initialized as empty array
 * input - controls the input form for adding tasks
 * filter - controls display of completed/uncompleted tasks
 */
  const [todolist, setTodolist] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  
/**
 * Function for saving the latest todo list to local storage
 * Can be manually called by save button
 * Called by useEffect every 60 seconds
 * Called every time new task is added
 */
  const saveToStorage = (updatedList) => {
    localStorage.setItem('todolist', JSON.stringify(updatedList));
    toast.success('Changes saved');
  }
  
/* Auto-save every 60s */
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      saveToStorage(todolist);
    }, 60000);
    
    return () => clearInterval(autosaveInterval);
  }, [todolist]);
  
/** 
 * Loads saved todo list from local storage if it exists
 * If not, retrieves placeholder list as tutorial
 */
  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('todolist')) || [
      { id: 1, task: 'Click on this task to edit', completed: false, },
      { id: 2, task: 'Mark this as completed with the box icon', completed: false, },
      { id: 3, task: 'Delete this task with the trash icon', completed: true, },
      { id: 4, task: 'Start a focused timer on this task with the stopwatch icon', completed: false, },
      { id: 5, task: 'Save changes with the save icon (It autosaves every 1 minute!)', completed: false, },
    ];
    setTodolist(savedTodoList);
  }, [])

/**
 * Function for creating new tasks
 * Automatically calls saveToStorage()
 */
  const addTodo = (event) => {
    event.preventDefault();
    const id = todolist.length + 1;
    const newTodo = {
      id: id,
      task: input,
      completed: false
    };
    const updatedTodoList = [...todolist, newTodo];
    setTodolist(updatedTodoList);
    saveToStorage(updatedTodoList);
    setInput('');
  }

/**
 * Function for toggling completed status, identified by task id
 * Passed down to TodoItem component
 * and called by the checkbox/empty box icon
 */
  const toggleCompleted = (id) => {
    let list = todolist.map((task) => {
      let item = {};
      if (task.id === id) {
        item = { ...task, completed: !task.completed };
      } else item = { ...task };
    
      return item;
      });
    setTodolist(list);
  }

/**
 * Function for removing an item from the list, identified by task id
 * Passed down to TodoItem component
 * and called by the trash icon
 */
  const deleteTodo = (id) => {
    const list = todolist.filter((task) => task.id !== id);
    setTodolist(list);
  }

/**
 * Function for editing existing task, identified by task id
 * Called by clicking on the task text
 * Passed down to TodoItem component
 */
  const editTodo = (id, editedTask) => {
    const updatedTodoList = todolist.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: editedTask };
      }
      return todo;
    });
    setTodolist(updatedTodoList);
  }

/**
 * Handles display of completed/uncompleted tasks
 */
  const filterTodos = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div className='w-auto md:max-w-[640px] mx-auto'>
      {/* Filters Div */}
      <div name="labels" className='flex flex-row justify-start gap-4 text-neutral-400 font-light my-2 px-2 text-xs'>
        {/* Filter => All */}
        <label className='flex gap-2'>
          <input
            type="radio" 
            name="labels" 
            value="all" 
            checked={filter === 'all'}
            onChange={filterTodos}
            />
          All
        </label>

        {/* Filter => Uncompleted */}
        <label className='flex gap-2'>
          <input
            type="radio" 
            name="labels" 
            value="uncompleted" 
            checked={filter === 'uncompleted'}
            onChange={filterTodos}
            />
          To-Do
        </label>

        {/* Filter => Completed */}
        <label className='flex gap-2'>
          <input
            type="radio" 
            name="labels" 
            value="completed" 
            checked={filter === 'completed'}
            onChange={filterTodos}
            />
          Done
        </label>
      </div>

      {/* Task List Div */}
      <ul className='flex flex-col gap-2 mt-8'>
        {todolist?.length > 0 &&
          todolist.filter((todo) => {
            if (filter === 'all') return true;
            if (filter === 'uncompleted') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return false;
          })
          .map(todo => {
            return (
              <TodoItem
                key={todo.id} 
                item={todo} 
                toggleCompleted={toggleCompleted} 
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                />
            )
          })
        }
      </ul>

      {/* Add Task Input + Save Changes */}
      <form
        className='flex flex-row items-center justify-between gap-8 my-4'
        onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          placeholder='Add new task and hit enter'
          className='w-full p-2 px-10 hover:outline focus:outline hover:outline-1 focus:outline-1 hover:outline-sky-200 focus:outline-sky-200 focus:bg-white bg-transparent transition-all duration-500 text-black/20 focus:text-black text-xl font-extralight'
          onInput={event => setInput(event.target.value)}
          />

        {/* <button type="submit" className='mx-1 rounded-full w-auto'>
          <AiOutlineFileAdd className='text-black/20 hover:text-sky-500 duration-300'/>
        </button> */}

        <AiOutlineSave className='mx-2 text-xl w-auto rounded-full text-black/20 hover:text-sky-500 duration-300' onClick={() => saveToStorage(todolist)}/>

    </form>

    </div>
  )
}

export default TodoList