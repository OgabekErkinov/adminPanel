import React, { useState } from "react";
import { Box, Button, TextField, Stack, Typography, Snackbar, Alert, Paper } from "@mui/material";
import { loginApi } from "../axios/apis";
import { useNavigate } from "react-router";
import Loading from "../components/loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("phone_number", phone);
      formDataToSend.append("password", password);
      
      const data = await loginApi(formDataToSend);
      localStorage.setItem('phone_number' , phone)
      setIsLoading(false);
      setSeverity("success");
      setMessage("Tizimga kirish muvaffaqiyatli");
      setOpen(true);
      navigate("/");
    } catch (error) {
      setSeverity("error");
      setMessage("Login xatosi yuz berdi, iltimos qaytadan urinib ko‘ring.");
      setOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <Box height="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #000, #6D6D6D)" }}>
      <Paper elevation={10}
        sx={{ padding: 4, background: "#ffffff", borderRadius: 3, boxShadow: "0px 8px 16px rgba(255, 0, 0, 0.4)",
          width: 360 }} >
        <Typography variant="h5" textAlign="center" fontWeight="bold" color="#D32F2F" mb={2}>
          AutoZone Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField name="phone" label="Telefon raqami" fullWidth value={phone}
              onChange={(e) => setPhone(e.target.value)} variant="outlined" 
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#D32F2F' }, 
                    '&:hover fieldset': { borderColor: '#B71C1C' }, 
                    '&.Mui-focused fieldset': { borderColor: '#B71C1C' } }, 
                    '& .MuiInputLabel-root': { color: '#D32F2F' }, 
                    '& .Mui-focused .MuiInputLabel-root': { color: '#B71C1C' } }}
            />
            <TextField name="password" label="Parol" type="password" fullWidth
              value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#D32F2F' }, 
                    '&:hover fieldset': { borderColor: '#B71C1C' }, 
                    '&.Mui-focused fieldset': { borderColor: '#B71C1C' } }, 
                    '& .MuiInputLabel-root': { color: '#D32F2F' }, 
                    '& .Mui-focused .MuiInputLabel-root': { color: '#B71C1C' } }}
            />
            <Button type="submit" variant="contained" fullWidth
              sx={{ background: isLoading ? "#ffffff" : "#D32F2F", color: "#ffffff",
                fontWeight: "bold", textTransform: "uppercase", '&:hover': { background: "#B71C1C" } }}>
                {!isLoading ? 'Kirish' : <Loading/>}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
