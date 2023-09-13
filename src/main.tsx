import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import DetailPage from "./components/detailPage/detailPage";
import NotFound from "./components/NotFound/NotFound";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <BrowserRouter>
           <Routes>
                <Route path="/" element={<Login/>}/>
               <Route path={"/Register"} element={<Register/>}/>
               <Route path={"/Dashboard"} element={<Dashboard/>}/>
               <Route path={"/Dashboard/:CityId/:Name"} element={<DetailPage/>}/>
               <Route path={"*"} element={<NotFound/>}/>
           </Routes>
       </BrowserRouter>
  </React.StrictMode>,
)
