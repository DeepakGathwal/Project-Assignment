import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from "./components/User/Login";
import Registration from "./components/User/Registration";
import Profile from "./pages/Profile";

function App() {

 return (
 <>
 <Router>
   <Routes>
     <Route path="/login"  element={<Login/>}/>
     <Route path="/register"  element={<Registration/>}/>
     <Route index element={<Profile/>}/>
     <Route exact path="*" element={<Profile/>}/>
   </Routes>
 </Router>
   </>
 );
 
}

export default App;
