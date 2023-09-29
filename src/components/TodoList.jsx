import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import toast from 'react-hot-toast';
import { AiOutlineSave, AiOutlineFileAdd } from "react-icons/ai";

const TodoList = () => {
  const [todolist, setTodolist] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  
  const saveToStorage = (updatedList) => {
    localStorage.setItem('todolist', JSON.stringify(updatedList));
    toast.success('Changes saved');
  }
  
  // Auto-save every 30s
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      saveToStorage(todolist);
    }, 60000);
    
    return () => clearInterval(autosaveInterval);
  }, [todolist]);
  
  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('todolist')) || [
      { id: 1, task: 'Edit this task', completed: false, },
      { id: 2, task: 'Mark this as completed', completed: false, },
      { id: 3, task: 'Delete this task', completed: true, },
    ];
    setTodolist(savedTodoList);
  }, [])

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

  const toggleCompleted = (id) => {
    let list = todolist.map((task) => {
      let item = {};
      if (task.id === id) {
        item = { ...task, completed: !task.complete };
      } else item = { ...task };
    
      return item;
      });
    setTodolist(list);
  }

  const deleteTodo = (id) => {
    const list = todolist.filter((task) => task.id !== id);
    setTodolist(list);
  }

  const editTodo = (id, editedTask) => {
    const updatedTodoList = todolist.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: editedTask };
      }
      return todo;
    });
    setTodolist(updatedTodoList);
  }

  const filterTodos = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <form className='flex flex-row items-center my-4'
      onSubmit={addTodo}>
          <input
            type="text"
            value={input}
            placeholder='Add new task'
            className='w-full -ml-2 p-2 hover:outline focus:outline hover:outline-1 focus:outline-1 hover:outline-sky-200 focus:outline-sky-200 focus:bg-white bg-transparent transition-all duration-500 text-black/20 focus:text-black text-xl font-extralight'
            onInput={event => setInput(event.target.value)}
            />

          <button type="submit" className='mx-1 rounded-full w-auto'>
            <AiOutlineFileAdd className='text-black/20 hover:text-sky-500 duration-300'/>
          </button>

          <AiOutlineSave className='mx-1 text-xl w-auto rounded-full text-black/20 hover:text-sky-500 duration-300' onClick={() => saveToStorage(todolist)}/>

      </form>

        <div name="labels" className='flex flex-row justify-between text-neutral-400 font-light my-2'>
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
          <label className='flex gap-2'>
            <input
              type="radio" 
              name="labels" 
              value="uncompleted" 
              checked={filter === 'uncompleted'}
              onChange={filterTodos}
              />
            Uncompleted
          </label>
          <label className='flex gap-2'>
            <input
              type="radio" 
              name="labels" 
              value="completed" 
              checked={filter === 'completed'}
              onChange={filterTodos}
              />
            Completed
          </label>
        </div>


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


    </div>
  )
}

export default TodoList