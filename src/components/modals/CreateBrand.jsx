import React, { useState } from "react";
import { Box, Paper, Input, Button, Typography, Stack, IconButton, CircularProgress } from "@mui/material";
import { Close as CloseIcon, Image as ImageIcon } from "@mui/icons-material";
import { createBrand } from "../../axios/apis";
import Loading from "../loading/Loading";

const CreateBrand = ({ open, handleClose }) => {
  if (!open) return null;

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCreateBrand = async () => {
    if (!title || !image) {
      setErrorMessage("Iltimos, nom kiriting va rasm yuklang!");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("images", image);
      
      await createBrand(formData);
      handleClose(!open);
    } catch (error) {
      setErrorMessage("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center" 
         justifyContent="center" bgcolor="rgba(0, 0, 0, 0.6)" zIndex={10}>
      <Paper sx={{ bgcolor: "#212121", color: "#fff", borderRadius: 2, p: 3, width: "90%", maxWidth: "500px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>Yangi Brend</Typography>
          <IconButton onClick={() => handleClose(!open)} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
        </Box>

        {errorMessage && <Typography sx={{ color: "#D32F2F", fontWeight: "bold", textAlign: "center", mb: 2 }}>
                            {errorMessage}
                          </Typography>}

        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Rasm</Typography>
            <label htmlFor="upload-image">
              <Box sx={{ border: "2px dashed #D32F2F", borderRadius: 2, textAlign: "center", p: 2, 
                   cursor: "pointer", maxHeight:'18rem' }}>
                {imagePreview ? <img src={imagePreview} alt="Preview" 
                style={{ width: "100%", height : '12rem', borderRadius: 8, objectFit: "cover" }} /> : 
                                <ImageIcon sx={{ fontSize: 40, color: "#D32F2F" }} />}
                <Input id="upload-image" type="file" accept="image/*" onChange={handleImageChange} 
                       sx={{ display: "none", height : '100%' }} />
              </Box>
            </label>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Nomi</Typography>
            <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", 
                   borderRadius: 1, p: 1 }} value={title} onChange={(e) => setTitle(e.target.value)} 
                   placeholder="Brend nomini kiriting" />
          </Box>

          <Box display="flex" justifyContent={loading ? 'center': "flex-end"}>
            <Button sx={{ bgcolor: loading ? 'transparent' : "#D32F2F", color: "#FFFFFF", borderRadius: 1, 
                          padding: "10px 20px", 
                    "&:hover": { bgcolor:loading ? 'transparent' : "#B71C1C" } }} onClick={handleCreateBrand} disabled={loading}>
              {loading ? <Loading/> : "Yaratish"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CreateBrand;