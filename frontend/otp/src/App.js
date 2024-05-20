import React, {useState} from "react";
import { Phone_verify } from "./Components/Phone_verify/Phone_verify";
import {createRoutesFromElements,Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from "./Root";
import SearchLayout from "./Components/SearchLayout/SearchLayout";


function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <RouterProvider router = {
      createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element = {<Root/>}>
          {/* </Route> */}
          <Route path="" element = {<Phone_verify/>}/>
          <Route path="orders" element = {<SearchLayout/> }/>
          </Route>
        )
      )
    }/>
  );
}

export default App;
