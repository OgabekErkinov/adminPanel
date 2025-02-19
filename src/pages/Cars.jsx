import React, { useState, useEffect } from "react";
import { Box, Input, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { deleteCar, getCars } from "../axios/apis";
import { Edit, Delete } from "@mui/icons-material";
import Loading from "../components/loading/Loading";
import CreateCarModal from "../components/modals/CreateCarModal";
import EditCarModal from "../components/modals/EditCarModal";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  console.log(localStorage.getItem('token'))

  const filteredCars = cars.filter((car) =>
    car?.brand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car?.model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car?.city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllCars = async () => {
    setIsLoading(true);
    const { data } = await getCars();
    setCars(data);
    setIsLoading(false);
  };

  const deleteCarHandler = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOpenEditModal = (car) => {
    setSelectedCar(car);
    setOpenEditModal(true);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <Box height="100%" width="100%" display="flex" p={1} flexDirection="column" 
         alignItems="center" justifyContent="flex-start" bgcolor='transparent'>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" width="100%" mb={1}>
        <Input disableUnderline
          placeholder="Search cars by brand, model, or city..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          sx={{ width: isFocused ? '24rem' : '10rem', transition: 'width 0.3s ease-in-out',
            padding: '10px', borderRadius: '8px', backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.4)', fontWeight: 'bold', mr: 2 }} />
        <Button sx={{ bgcolor: 'green', color: '#FFFFFF', fontWeight: 'bold', height: '52px', width: '12rem' }}
                onClick={() => setOpenCreateModal(true)}>
           Create
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <Loading />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: '#ffffff', maxHeight : '80vh', height : '100%', width: '100%', borderRadius: '8px', 
                 boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' }, }}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{position:'sticky', top : '0', zIndex:'2'}}>
                <TableRow sx={{ background: 'rgba(71, 17, 24, 0.98)' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>№</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Brand</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Model</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>City</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Price (USD)</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars.map((car, idx) => (
                <TableRow key={car.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell align="center">
                    <Box
                      component="img"
                      src={`https://realauto.limsa.uz/api/uploads/images/${car.car_images.find(img => img.is_main)?.image.src}`}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid #cccccc',
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{car.brand.title}</TableCell>
                  <TableCell align="center">{car.model.name}</TableCell>
                  <TableCell align="center">{car.city.name}</TableCell>
                  <TableCell align="center">${car.price_in_usd}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button onClick={() => handleOpenEditModal(car)}>
                        <Edit sx={{ color: 'blue' }} />
                      </Button>
                      <Button onClick={() => deleteCarHandler(car.id)}>
                        <Delete sx={{ color: 'red' }} />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateCarModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} />
      <EditCarModal open={openEditModal} handleClose={() => setOpenEditModal(false)} car={selectedCar} />
    </Box>
  );
};

export default Cars;