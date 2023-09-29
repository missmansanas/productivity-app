import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Pomodoro from './components/Pomodoro'
import TodoList from './components/TodoList'
import ErrorPage from './components/ErrorPage.jsx';
import AboutPage from './components/AboutPage';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <TodoList/>,
      },
      {
        path: "pomodoro",
        element: <Pomodoro/>,
      },
      {
        path: "about",
        element: <AboutPage/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
