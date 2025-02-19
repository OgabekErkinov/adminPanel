import React, { useState, useEffect } from "react";
import { Box, Paper, Input, Button, Typography, IconButton, MenuItem, Select } from "@mui/material";
import { Close as CloseIcon, Image as ImageIcon } from "@mui/icons-material";
import Loading from "../loading/Loading";
import { createCars, getBrands, getModels, getCategories, getCities, getLocations } from "../../axios/apis";

const CreateCarModal = ({ open, handleClose }) => {
  if (!open) return null;

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    images: [],
    brand_id: "",
    model_id: "",
    category_id: "",
    city_id: "",
    location_id: "",
    year: "",
    color: "",
    petrol: "",
    seconds: "",
    max_speed: "",
    max_people: "",
    transmission: "",
    motor: "",
    drive_side: "",
    limitperday: "",
    deposit: "",
    price_in_aed: "",
    price_in_usd: "",
    price_in_aed_sale: "",
    price_in_usd_sale: "",
    inclusive: "false",
    cover: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      setBrands((await getBrands())?.data || []);
      setModels((await getModels())?.data || []);
      setCategories((await getCategories())?.data || []);
      setCities((await getCities())?.data || []);
      setLocations((await getLocations())?.data || []);
    };
    fetchData();
  }, []);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Fayllarni preview qilish
    const previewURLs = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previewURLs);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    // Rasmlar massiv sifatida API-ga yuboriladi
    if (formData.images.length > 0) {
      formData.images.forEach((image) => {
        data.append("images[]", image);
      });
    } else {
      alert("Please upload at least one image.");
      setLoading(false);
      return;
    }

    // Qolgan maydonlarni qo‘shish
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && value !== "" && value !== null) {
        data.append(key, value);
      }
    });

    try {
      await createCars(data);
      handleClose();
    } catch (error) {
      console.error("Error creating car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="fixed" top={0} left={0} bgcolor="rgba(0, 0, 0, 0.6)" zIndex={10} width="100vw" height="100vh" 
         display="flex" alignItems="center" justifyContent="center">
      <Paper sx={{ bgcolor: "#212121", color: "#fff", borderRadius: 2, px: 2, width: "100%", height: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>New Car</Typography>
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr 1fr 1fr 1fr" }} gap={2}>
          <Box gridColumn="span 2" gridRow="span 2">
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Pictures</Typography>
            <label htmlFor="upload-images">
              <Box sx={{ border: "2px dashed #D32F2F", borderRadius: 2, textAlign: "center", p: 2, cursor: "pointer", height: "12rem" }}>
                {imagePreviews.length > 0 ? (
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: "30%", borderRadius: 8, objectFit: "cover" }} />
                    ))}
                  </Box>
                ) : (
                  <ImageIcon sx={{ fontSize: 40, color: "#D32F2F" }} />
                )}
                <Input id="upload-images" type="file" accept="image/*" multiple onChange={handleImageChange} sx={{ display: "none" }} />
              </Box>
            </label>
          </Box>

          {["brand", "model", "category", "city", "location"].map((field) => (
            <Box key={field}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>{field.toUpperCase()}</Typography>
              <Select fullWidth name={`${field}_id`} value={formData[`${field}_id`]} onChange={handleChange} displayEmpty 
                      sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                <MenuItem value="">Select {field}</MenuItem>
                {(field === "brand" ? brands : field === "model" ? models : field === "category" ? categories : field === "city" ? cities : locations).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name_en || item.title || item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          ))}

          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>INCLUSIVE</Typography>
            <Select fullWidth name="inclusive" value={formData.inclusive} onChange={handleChange} displayEmpty 
                    sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box display="flex" justifyContent={loading ? 'center' : "flex-end"} mt={3}>
          <Button onClick={handleSubmit} 
                  sx={{ bgcolor: loading ? 'transparent' : "#D32F2F", color: "#FFFFFF", borderRadius: 1, 
                        padding: "10px 20px", "&:hover": { bgcolor: loading ? 'transparent' : "#B71C1C" } }} 
                  disabled={loading}>
            {loading ? <Loading /> : "Create"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateCarModal;
