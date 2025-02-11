import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const EditCarModal = ({ open, handleClose, car }) => {
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    city: "",
    price: "",
  });

  useEffect(() => {
    if (car) {
      setCarDetails({
        brand: car.brand.title,
        model: car.model.name,
        city: car.city.name,
        price: car.price_in_usd,
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleEdit = () => {
    // Car edit logic
    console.log(carDetails);
    handleClose();  // Close the modal after editing
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <TextField
          name="brand"
          label="Brand"
          fullWidth
          value={carDetails.brand}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="model"
          label="Model"
          fullWidth
          value={carDetails.model}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="city"
          label="City"
          fullWidth
          value={carDetails.city}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="price"
          label="Price (USD)"
          type="number"
          fullWidth
          value={carDetails.price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCarModal;
