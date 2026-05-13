import { useState } from 'react'
import './App.css'
import { EmployeeList } from './component/EmployeeList'
import { Route, Routes } from 'react-router-dom'
import LoginUser from './component/LoginUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
   <Routes>
    <Route path='/' element={<EmployeeList/>}/>
    <Route path="/login" element={<LoginUser/>}/>
   </Routes>
    </>
  )
}

export default App