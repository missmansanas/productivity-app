import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Pomodoro from './components/Pomodoro'
import TodoList from './components/TodoList'
import ErrorPage from './components/ErrorPage.jsx';
import AboutPage from './components/AboutPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/productivity-app'>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' index element={<TodoList/>} />
          <Route path='/pomodoro' element={<Pomodoro/>} />
          <Route path='/about' element={<AboutPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
