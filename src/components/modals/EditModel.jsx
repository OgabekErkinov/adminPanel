import React, { useState, useEffect } from "react";
import { Box, Paper, Input, Button, Typography, Stack, IconButton, Select, MenuItem } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Loading from "../loading/Loading";
import { updateModel, getBrands } from "../../axios/apis";

const EditModel = ({ model, setEditModelModal, getAllModels }) => {
  const [name, setName] = useState(model?.name || "");
  const [brandId, setBrandId] = useState(model?.brand_id || "");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error("Brendlarni yuklashda xatolik:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleUpdateModel = async () => {
    if (!name || !brandId) {
      setErrorMessage("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      await updateModel(model.id, { name, brand_id: brandId });
      getAllModels();
      setEditModelModal(false);
    } catch (error) {
      setErrorMessage("Xatolik yuz berdi. Qayta urinib ko'ring!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center"
         justifyContent="center" bgcolor="rgba(0, 0, 0, 0.6)" zIndex={10}>
      <Paper sx={{ bgcolor: "#212121", color: "#fff", borderRadius: 2, p: 3, width: "90%", maxWidth: "500px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>Modelni Tahrirlash</Typography>
          <IconButton onClick={() => setEditModelModal(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {errorMessage && <Typography sx={{ color: "#D32F2F", fontWeight: "bold", textAlign: "center", mb: 2 }}>
                            {errorMessage}
                          </Typography>}

        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Model Nomi</Typography>
            <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5",
                   borderRadius: 1, p: 1 }} value={name} onChange={(e) => setName(e.target.value)}
                   placeholder="Model nomini kiriting" />
          </Box>

          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Brand</Typography>
            <Select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ height: "48px", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }}
            >
              <MenuItem value="" disabled>Brand tanlang</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>{brand.title}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box display="flex" justifyContent={loading ? 'center' : "flex-end"}>
            <Button sx={{ bgcolor: loading ? 'transparent' : "#D32F2F", color: "#FFFFFF", borderRadius: 1,
                          padding: "10px 20px",
                    "&:hover": { bgcolor: loading ? 'transparent' : "#B71C1C" } }} onClick={handleUpdateModel} disabled={loading}>
              {loading ? <Loading /> : "Saqlash"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditModel;
