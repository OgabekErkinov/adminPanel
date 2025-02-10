import { Route, Routes, useNavigate } from "react-router"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Categories from "./pages/Categories"
import Brands from "./pages/Brands"
import Models from "./pages/Models"
import Locations from "./pages/Locations"
import Cities from "./pages/Cities"
import Dashboard from "./pages/Dashboard"
import Cars from "./pages/Cars"
import Account from "./pages/Account"

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
       <Route path="/login" element = {<Login/>}/>
       <Route path="/" element = {<Home/>}>
             <Route path='/dashboard' element = {<Dashboard/>}/>
             <Route path='categories' element = {<Categories/>}/>
             <Route path='brands' element = {<Brands/>}/>
             <Route path = 'models' element = {<Models/>}/>
             <Route path='locations' element = {<Locations/>}/>
             <Route path='cities' element = {<Cities/>}/>
             <Route path='cars' element = {<Cars/>}/>
             <Route path='/account' element = {<Account/>}/>
       </Route>
    </Routes>
  )
}

export default App
