import React, { useState, useEffect } from "react";
import { Box, Input, Stack, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getCities, deleteCity } from "../axios/apis";
import { Delete, Edit } from "@mui/icons-material";
import Loading from "../components/loading/Loading";
import CreateCityModal from "../components/modals/CreateCity";
import EditCityModal from "../components/modals/EditCityModal";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updatedCity, setUpdatedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    <Box height="100%" width="100%" display="flex" p={1} flexDirection="column" alignItems="center" 
         justifyContent="flex-start">
      
      <Stack direction="row" justifyContent="flex-end" alignItems="center" width="100%" mb={1}>
        <Input disableUnderline placeholder="Search city..." onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          sx={{ width: isFocused ? "24rem" : "12rem", transition: "width 0.3s ease-in-out",
            padding: "10px", borderRadius: "8px", backgroundColor: "#ffffff",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.4)", fontWeight: "bold", mr: 2, }}/>
        <Button sx={{ bgcolor: "green", color: "#FFFFFF", fontWeight: "bold", height: "52px", width: "12rem" }} 
                onClick={() => setCreateModal(true)}>
          Create
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Loading />
        </Box>
      ) : (
        <TableContainer component={Paper} 
                        sx={{ backgroundColor: '#ffffff',maxHeight : '80vh', width: '100%', borderRadius: '8px', 
                              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', overflowY: 'auto',
                              '&::-webkit-scrollbar': { width: '6px' },
                              '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
                              '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' }, }}>
          <Table>
            <TableHead sx={{position : 'sticky', top : '0', zIndex : '2'}}>
              <TableRow sx={{ background: 'rgb(71, 17, 24)' }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>№</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Picture</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>City</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Text</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Events</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCities?.map((city, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell align="center">
                    <Box component="img" src={`https://realauto.limsa.uz/api/uploads/images/${city?.image_src}`}
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

      {createModal && <CreateCityModal handleClose={() => setCreateModal(false)} open={createModal} getAllCities={getAllCities} />}
      {editModal && <EditCityModal city={updatedCity} setEditCityModal={setEditModal} getAllCities={getAllCities} />}
    </Box>
  );
};

export default Cities;
