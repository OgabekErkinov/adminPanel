import React, { useState } from "react";
import { Box, Paper, Input, Button, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon, Image as ImageIcon } from "@mui/icons-material";
import Loading from "../loading/Loading";
import { createCars } from "../../axios/apis";

const CreateCarModal = ({ open, handleClose }) => {
  if (!open) return null;

  const [formData, setFormData] = useState({
    image: null,
    title: "",
    brand: "",
    model: "",
    category: "",
    city: "",
    year: "",
    color: "",
    fuelType: "",
    price: "",
    seconds: "",
    maxSpeed: "",
    maxPeople: "",
    transmission: "",
    motor: "",
    driveSide: "",
    limitPerDay: "",
    deposit: "",
    premiumProtection: "",
    priceAed: "",
    priceUsd: "",
    priceAedSale: "",
    priceUsdSale: "",
    inclusive: "",
    cover: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    await createCars(data);
    setLoading(false);
  };

  return (
    <Box position="fixed" top={0} left={0}  bgcolor="rgba(0, 0, 0, 0.6)" zIndex={10}>
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">       
      <Paper sx={{ bgcolor: "#212121", color: "#fff", borderRadius: 2, p: 3, 
                   width: "100%", maxHeight: "100vh", overflowY: "auto" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>Yangi Avtomobil</Typography>
          <IconButton onClick={() => handleClose(!open)} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }} gap={2}>

          {Object.keys(formData).filter(field => field !== "image").map((field, index) => (
            <Box key={index}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>{field}</Typography>
              <Input disableUnderline fullWidth name={field} 
                     sx={{ height: "48px", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }} 
                     value={formData[field]} onChange={handleChange} />
            </Box>
          ))}

          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Rasm</Typography>
            <label htmlFor="upload-image">
              <Box sx={{ border: "2px dashed #D32F2F", borderRadius: 2, textAlign: "center", 
                         p: 2, cursor: "pointer", height : '12rem' }}>
                {imagePreview ? <img src={imagePreview} alt="Preview" 
                                     style={{ width: "100%", height : '100%', borderRadius: 8, objectFit: "cover" }} /> : 
                                <ImageIcon sx={{ fontSize: 40, color: "#D32F2F" }} />}
                <Input id="upload-image" type="file" accept="image/*" onChange={handleImageChange} 
                       sx={{ display: "none" }} />
          </Box>
            </label>
          </Box>
        </Box>

        <Box display="flex" justifyContent={loading ? 'center' : "flex-end"} mt={3}>
          <Button onClick={handleSubmit} 
                  sx={{ bgcolor: loading ? 'transparent' : "#D32F2F", color: "#FFFFFF", borderRadius: 1, padding: "10px 20px", 
                        "&:hover": { bgcolor: loading ? 'transparent' : "#B71C1C" } }} disabled={loading}>
            {loading ? <Loading /> : "Yaratish"}
          </Button>
        </Box>
      </Paper>
      </Box>
    </Box>
  );
};

export default CreateCarModal;