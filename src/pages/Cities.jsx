import React, { useState, useEffect } from "react";
import { Box, Input, Stack, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getCities, deleteCity } from "../axios/apis";
import { Delete, Edit } from "@mui/icons-material";
import Loading from "../components/loading/Loading";
import CreateCityModal from "../components/modals/CreateCity";
import EditCityModal from "../components/modals/EditCityModal";
// import CreateCity from "../components/modals/CreateCity";
// import EditCity from "../components/modals/EditCity";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updatedCity, setUpdatedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredCities = cities.filter((city) => city?.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getAllCities = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCities();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setIsLoading(false);
  };

  const deleteCityHandler = async (id) => {
    try {
      await deleteCity(id);
      setCities(cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const handleEdit = (city) => {
    setUpdatedCity(city);
    setEditModal(true);
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <Box
      height="100vh" width="100vw" display="flex" p={2}
      flexDirection="column" alignItems="center" justifyContent="flex-start"
      sx={{ background: "linear-gradient(135deg, #000, #6D6D6D)" }}>
      
      <Stack direction="row" justifyContent="space-between" alignItems="center" 
             width="100%" maxWidth="900px" mb={2}>
        <Input disableUnderline
          placeholder="Shahar qidiring..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "100%", padding: "10px", borderRadius: "8px",
            backgroundColor: "#ffffff", boxShadow: "0 0 10px rgba(255, 0, 0, 0.4)",
            fontWeight: "bold", mr: 2,
          }}
        />
        <Button
          sx={{ bgcolor: "green", color: "#FFFFFF", fontWeight: "bold", height: "40px", width: "12rem" }}
          onClick={() => setCreateModal(true)}>
          Yangi shahar
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Loading />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "1200px", borderRadius: "8px", 
                        overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#D32F2F" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>№</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Rasm</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Shahar nomi</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Matn</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCities?.map((city, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell align="center">
                    <Box component="img" src = {`https://realauto.limsa.uz/api/uploads/images/${city?.image_src}`}
                         sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: "6px" }} />
                  </TableCell>
                  <TableCell align="center">{city.name}</TableCell>
                  <TableCell align="center">{city.text}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button onClick={() => handleEdit(city)}>
                        <Edit sx={{ color: "blue" }} />
                      </Button>
                      <Button onClick={() => deleteCityHandler(city.id)}>
                        <Delete sx={{ color: "red" }} />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {createModal && <CreateCityModal  handleClose={() => setCreateModal(false)} open={createModal} />}
      {editModal && <EditCityModal city={updatedCity} setEditCityModal={setEditModal}/>}
    </Box>
  );
};

export default Cities;