import { Dashboard, MenuBook, MenuOpenOutlined, MenuOutlined } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

const Home = () => {
    const navigate = useNavigate()
    if(!localStorage.getItem('token')){
         navigate('/login')
    }

    const [openMenu, setOpenMenu] = useState(true)
    console.log(localStorage.getItem('token'))


  return (
    <Box height='100vh' width='100%'>
        <Stack direction='row' height='100%' width='100%'>
            <Box height='100%' width='100%' minWidth='300px' maxWidth='320px' bgcolor='rgb(175, 175, 175)'>
                <Stack height='100%' width='100%' justifyContent='space-between' alignItems='center'>
                    <Box height='auto' minWidth='300px' maxWidth='320px' position='absolute' zIndex={2} top='0'>
                        <Stack height='auto' width='100%' alignItems='flex-end'>
                          <MenuOutlined sx={{height : '24px', width : '24px', color : '#FFFFFF'}}/>
                        </Stack>
                    </Box>

                    <Box height='auto' width='100%' mt='36px'>
                        <Link to='/dashboard'>
                             <Stack direction='row' justifyContent='center' alignItems='center' gap='6px' width='100%'>
                                <Dashboard sx={{height : '36px', color : '#FFFFFF'}}/>
                                <Typography fontSize='36px' fontWeight='600' color="#FFFFFF" sx={{}}>Dashboard</Typography>
                             </Stack>
                            
                        </Link>

                    </Box>

                </Stack>

            </Box>

        </Stack>

    </Box>
  )
}

export default Home
