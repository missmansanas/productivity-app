import './App.css'
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <NavBar/>
      <div id="body" className='h-full box-border mx-auto'>
        <Outlet/>
        <Toaster 
          position='bottom-right'
          toastOptions={{
            duration: 3000,
            style: {
              background: 'transparent',
              color: '#9CA8C8',
              fontWeight: '200',
              fontSize: '1.25rem',
              margin: '0.5rem'
            }
          }}
        />
      </div>
    </>
  )
}

export default App
