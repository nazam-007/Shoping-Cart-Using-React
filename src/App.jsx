import { Route, Routes } from 'react-router'
import { Fragment } from 'react'
import './App.css'
import ProductListPage from './pages/productList'
import ProductDetailsPage from './pages/productDetails'
import CartListPage from './pages/cartList'

function App() {


  return (
    <Fragment>
      <h1>Shopping Cart App</h1>
      <Routes>
          <Route path='/Products' element={<ProductListPage/>}/>
          <Route path="/product-details/:id" element={<ProductDetailsPage/>}/>
          <Route path='/cart' element={<CartListPage/>}/>
      </Routes>
    
    </Fragment>
  )
}

export default App
