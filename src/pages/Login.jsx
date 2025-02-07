import React, { useState } from "react";
import { Box, Button, TextField, Stack, Typography, Snackbar, Alert } from "@mui/material";
import { loginApi } from "../axios/apis";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("phone_number", phone);
      formDataToSend.append("password", password);
      
      const data = await loginApi(formDataToSend)
      
      setSeverity("success");
      setMessage("Tizimga kirish muvaffaqiyatli");
      setOpen(true);
      navigate('/')
    } catch (error) {
      console.error(error);
      setSeverity("error");
      setMessage("Login xatosi yuz berdi, iltimos qaytadan urinib ko‘ring.");
      setOpen(true);
    }
  };

  return (
    <Box height="100vh" width="100vw" bgcolor="#D3D3D3" display="flex" alignItems="center" justifyContent="center">
      <Box p={4} bgcolor="#E0E0E0" borderRadius={2} boxShadow={3} width={320}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="phone" label="Username" fullWidth value={phone} sx={{border : 'none'}}
                       onChange={(e) => setPhone(e.target.value)} />
            <TextField name="password" label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" color="primary" sx={{bgcolor : 'rgb(134, 133, 133)'}}>
              <Typography fontWeight='600' fontSize='14px'>
                 Kirish
              </Typography> 
            </Button>
          </Stack>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
