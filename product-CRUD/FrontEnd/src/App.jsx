import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CategoryCard from './pages/CategoryCard'
import Product from './component/Product'
import ProductDetails from './component/ProductDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<CategoryCard/>}/>
      <Route path='/category/:id' element={<Product/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      
    </Routes>
     
    </>
  )
}

export default App
