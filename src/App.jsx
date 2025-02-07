import { Route, Routes, useNavigate } from "react-router"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
       <Route path="/login" element = {<Login/>}/>
       <Route path="/" element = {<Home/>}/>
    </Routes>
  )
}

export default App
