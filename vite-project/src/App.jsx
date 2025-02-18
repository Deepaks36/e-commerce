
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Lo from './Log'
import Login from './Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/log' element={<Lo/>}/> 
          <Route path='/login' element={<Login/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
