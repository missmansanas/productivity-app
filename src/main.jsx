import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import Pomodoro from './components/Pomodoro'
import TodoList from './components/TodoList'
import ErrorPage from './components/ErrorPage.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage/>,
//     children: [
//       {
//         path: "/",
//         element: <TodoList/>,
//       },
//       {
//         path: "pomodoro",
//         element: <Pomodoro/>,
//       },
//     ]
//   },
// ],
// {
//   basename: '/productivity-app'
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter basename='/productivity-app'>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' index element={<TodoList/>} />
          <Route path='/pomodoro' element={<Pomodoro/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
