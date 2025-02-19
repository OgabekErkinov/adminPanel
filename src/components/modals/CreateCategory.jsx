import React, { useState } from "react";
import { Box, Paper, Input, Button, Typography, Stack, IconButton } from "@mui/material";
import { Close as CloseIcon, Image as ImageIcon } from "@mui/icons-material";
import { createCategory } from "../../axios/apis";
import Loading from "../loading/Loading";

const CreateCategory = ({ open, handleClose, getAllCategories }) => {

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name_en, setName_en] = useState("");
  const [name_ru, setName_ru] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCreateCategory = async () => {
    if (!name_en || !name_ru || !image) {
      setErrorMessage("Iltimos, barcha maydonlarni to‘ldiring va rasm yuklang!");
      return;
    }
    setErrorMessage("");

    try {
      setIsloading(true)
      const formData = new FormData();
      formData.append("images", image);
      formData.append("name_en", name_en);
      formData.append("name_ru", name_ru);

      await createCategory(formData);
      setIsloading(false)
      getAllCategories()
      handleClose();
    } catch (error) {
      setErrorMessage("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring!");
      setIsloading(false)
    }
  };

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center" 
         justifyContent="center" bgcolor="rgba(0, 0, 0, 0.6)" zIndex={10}>
      <Paper sx={{ bgcolor: "#212121", color: "#fff", borderRadius: 2, p: 3, width: "90%", maxWidth: "500px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>Yangi Kategoriya</Typography>
          <IconButton onClick={() => handleClose(!open)} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
        </Box>

        {errorMessage && <Typography sx={{ color: "#D32F2F", fontWeight: "bold", textAlign: "center", mb: 2 }}>{errorMessage}</Typography>}

        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Rasm</Typography>
            <label htmlFor="upload-image">
              <Box sx={{ border: "2px dashed #D32F2F", borderRadius: 2, p: 2, cursor: "pointer", 
                         height:'12rem', display : 'flex', alignItems : 'center', justifyContent : 'center' }}>
                {imagePreview ? <img src={imagePreview} alt="Preview" 
                                     style={{ width: "100%", height : '100%', borderRadius: 8, objectFit: "cover" }} /> : 
                                <ImageIcon sx={{ fontSize: 40, color: "#D32F2F" }} />}
                <Input id="upload-image" type="file" accept="image/*" onChange={handleImageChange} sx={{ display: "none", height : '100%' }} />
              </Box>
            </label>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Nomi (Inglizcha)</Typography>
            <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }} value={name_en} onChange={(e) => setName_en(e.target.value)} placeholder="Inglizcha nomini kiriting" />
          </Box>

          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Nomi (Ruscha)</Typography>
            <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }} value={name_ru} onChange={(e) => setName_ru(e.target.value)} placeholder="Ruscha nomini kiriting" />
          </Box>

          <Box display="flex" justifyContent={isLoading ? "center" : "flex-end"}>
            {
              isLoading ? <Loading/> : 
              <Button sx={{ bgcolor: "#D32F2F", color: "#FFFFFF", borderRadius: 1, padding: "10px 20px", 
                            "&:hover": { bgcolor: "#B71C1C" } }} onClick={handleCreateCategory}>Yaratish</Button>
            }
            
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CreateCategory;
