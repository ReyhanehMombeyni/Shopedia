import { createBrowserRouter, RouterProvider } from 'react-router'

import Navbar from "./components/Navbar"
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'

import {loader as loaderProducts} from "./components/Home.jsx"

const router= createBrowserRouter([
  {
    path:"/",
    element: <Home />,
    loader: loaderProducts
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/signup",
    element: <SignUp />
  }
])

function App() {

  return (
    <div className='bg-blue-50 min-h-screen p-10'>
      <Navbar />
      <RouterProvider router={router} />
    </div>
    
  )
}

export default App
