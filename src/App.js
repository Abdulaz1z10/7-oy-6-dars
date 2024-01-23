import React  from 'react'
import { Routes, Route } from 'react-router-dom';
import Counter from './pages/Counter';
// import CRUD from './pages/CRUD';


export default function App() {
  return (
    <Routes>
      <Route path="" element={<Counter />} />
      {/* <Route path="" element={<CRUD />} /> */}
    </Routes>
  );
}
