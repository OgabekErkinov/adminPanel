import React, { useState, useEffect } from "react";
import { Box, Paper, Select, MenuItem, Button, Typography, Stack, IconButton, Modal, Input } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { getBrands, getModels, getCities, getCategories, getLocations, updateCar } from "../../axios/apis";

const EditCarModal = ({ open, handleClose, car }) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [carDetails, setCarDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setBrands((await getBrands())?.data || []);
      setModels((await getModels())?.data || []);
      setCities((await getCities())?.data || []);
      setCategories((await getCategories())?.data || []);
      setLocations((await getLocations())?.data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (car) {
      setCarDetails({ ...car });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleEdit = async () => {
    await updateCar(car.id, carDetails);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box bgcolor="#424242" p={3} borderRadius={2} boxShadow={24} width={{ xs: "90vw", sm: "60vw", md: "50vw" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#F44336" }}>Edit Car</Typography>
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2}>
          {Object.keys(carDetails).map((key) => (
            <Box key={key}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>{key.replace(/_/g, " ")}</Typography>
              {key.includes("id") || key === "drive_side" ? (
                <Select fullWidth name={key} value={carDetails[key] || ""} onChange={handleChange} displayEmpty sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                  {key === "brand_id" && brands.map((item) => <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)}
                  {key === "model_id" && models.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                  {key === "city_id" && cities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                  {key === "category_id" && categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)}
                  {key === "location_id" && locations.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                  {key === "drive_side" && (
                    <>
                      <MenuItem value="right">Right</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                    </>
                  )}
                </Select>
              ) : (
                <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }} value={carDetails[key] || ""} onChange={handleChange} name={key} placeholder={`Enter ${key.replace(/_/g, " ")}`} type={key.includes("price") || key === "year" || key.includes("max") || key === "seconds" ? "number" : "text"} />
              )}
            </Box>
          ))}
        </Stack>

        <Stack direction="row" justifyContent="center" mt={2}>
          <Button onClick={handleEdit} sx={{ bgcolor: "green", color: "#FFFFFF", fontWeight: "bold", ml: 2 }}>Save</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditCarModal;
