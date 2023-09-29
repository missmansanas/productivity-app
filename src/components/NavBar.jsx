import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='nav flex gap-8 justify-end box-border'>
      <NavLink 
        to="/"
        className={({isActive}) => isActive ? "active" : ""}
        >
        To-do List
      </NavLink>
      <NavLink 
        to="/pomodoro"
        className={({isActive}) => isActive ? "active" : ""}
        state={{ focusTask: 'Enter your focus here.'}}
        >
        Pomodoro
        </NavLink>
    </div>
  )
}

export default NavBar