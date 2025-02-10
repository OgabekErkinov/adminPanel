import { Box, Stack } from "@mui/material"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router"
import MenuBar from "../components/MenuBar"


const Home = () => {
    const [openMenu, setOpenMenu] = useState(true)
    const navigate = useNavigate()

    console.log(localStorage.getItem('token'))
    
    if(!localStorage.getItem('token')){
         navigate('/login')
    }

  return (
    <Box height='100vh' width='100%'>
        <Stack direction='row' height='100%' width='100%'>
            <MenuBar open={openMenu} setOpen={setOpenMenu}/> 
            <Outlet/>
        </Stack>

    </Box>
  )
}

export default Home
