import './index.css'
import {HashRouter} from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Mixr from './Mixr';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Mixr"/>} />
        <Route path="/Mixr/*" element={<Mixr/>}/>
      </Routes>
    </HashRouter>

  );
}

export default App;
