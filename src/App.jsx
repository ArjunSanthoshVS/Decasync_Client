import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SupplierForm from './pages/SupplierForm'
import ItemForm from './pages/ItemForm'
import Supplier from './pages/Supplier'
import Item from './pages/Item'
import OrderForm from './pages/OrderForm'
import Order from './pages/Order'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/supplier' exact element={<Supplier />} />
        <Route path='/item' exact element={<Item />} />
        <Route path='/order' exact element={<Order />} />
        <Route path='/supplierform' exact element={<SupplierForm />} />
        <Route path='/itemform' exact element={<ItemForm />} />
        <Route path='/orderform' exact element={<OrderForm />} />
      </Routes>
    </>
  )
}

export default App
