/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './app/layout';
import { DataTableDemo } from './productos/components/table-productos/table-productos';

function App() {

  return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout />}>
    <Route path='/productos' element={<DataTableDemo />}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
