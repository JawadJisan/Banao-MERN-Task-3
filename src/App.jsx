import React from 'react'
import './App.css'
import DataTable from './components/Datatable'
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (

    <div style={{marginBottom:"100px"}}>
      <Toaster />
      <DataTable></DataTable>
    </div>
  )
}

export default App