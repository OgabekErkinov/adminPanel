import React, { useState, useEffect } from 'react';
import { Box, Input, Stack, Button } from '@mui/material';
import { deleteBrand, getBrands } from '../axios/apis';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateBrand from '../components/modals/CreateBrand';
import { Delete, Edit } from '@mui/icons-material';
import EditBrand from '../components/modals/EditBrand';
import Loading from '../components/loading/Loading';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [updatedBrand, setUpdatedBrand] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const filteredBrands = brands.filter((brand) =>
    brand?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllBrands = async () => {
    setIsLoading(true);
    const { data } = await getBrands();
    setBrands(data);
    setIsLoading(false);
  };

  const deleteCard = async (id) => {
    try {
      await deleteBrand(id);
      setBrands(brands.filter(brand => brand.id !== id));
    } catch (error) {
      console.error('Xatolik:', error);
    }
  };

  const handleEdit = (brand) => {
    setUpdatedBrand(brand);
    setEditModal(true);
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <Box height="100%" width="100%" 
         display="flex" p={1} flexDirection="column" alignItems="center" justifyContent="flex-start" bgcolor='transparent'>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" width="100%" p={1}>
        <Input 
          disableUnderline 
          placeholder="Search brand..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          sx={{ 
            width: isFocused ? '24rem' : '10rem',
            transition: 'width 0.3s ease-in-out',
            padding: '10px', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            fontWeight: 'bold', 
            mr: 2 
          }} 
        />
        <Button sx={{ bgcolor: 'green', color: '#FFFFFF', fontWeight: 'bold', height: '52px', width: '12rem' }} 
                onClick={() => setCreateModal(!createModal)}>Create</Button>
      </Stack>
      {isLoading ? (
        <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'> 
           <Loading />
       </Box>
            ) : (
      <TableContainer component={Paper} 
                      sx={{ backgroundColor: '#ffffff',maxHeight : '80vh', width: '100%', borderRadius: '8px', 
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', overflowY: 'auto',
                            '&::-webkit-scrollbar': { width: '6px' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
                            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' }, }}>
        <Table sx={{ minWidth: '400px' }}>
          <TableHead sx={{position : 'sticky', top : '0', zIndex:'2'}}>
            <TableRow sx={{ background: 'rgb(71, 17, 24)' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}>№</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>Picture</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>Title</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>Events</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {
              filteredBrands.map((brand, idx) => (
                <TableRow key={brand.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell align="center">
                    <Box component="img" src={`https://realauto.limsa.uz/api/uploads/images/${brand?.image_src}`} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '6px', border: '1px solid #cccccc' }} />
                  </TableCell>
                  <TableCell align="center">{brand.title}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button onClick={() => handleEdit(brand)}><Edit sx={{ color: 'blue' }} /></Button>
                      <Button onClick={() => deleteCard(brand.id)}><Delete sx={{ color: 'red' }} /></Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>)}
      {createModal && <CreateBrand getAllBrands={getAllBrands} handleClose={setCreateModal} open={createModal} />}
      {editModal && <EditBrand brand={updatedBrand} setEditBrandModal={setEditModal} />}
    </Box>
  );
};

export default Brands;
