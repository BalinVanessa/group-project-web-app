import './App.css';
import { Routes, Route, Navigate } from "react-router";
import Mixr from './Mixr';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mixr/>}/>
    </Routes>

  );
}

export default App;
