import React, { useState, useEffect } from 'react';
import { Box, Input, Stack, Button, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateLocation from '../components/modals/CreateLocation';
import { Delete, Edit } from '@mui/icons-material';
import EditLocation from './EditLocation';
import Loading from '../components/loading/Loading';
import { deleteLocation, getLocations } from '../axios/apis';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [updatedLocation, setUpdatedLocation] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredLocations = locations.filter((location) =>
    location?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllLocations = async () => {
    setIsLoading(true);
    const {data}  = await getLocations();
    setLocations(data);
    setIsLoading(false);
  };

  const deleteCard = async (id) => {
    try {
      await deleteLocation(id);
      setLocations(locations.filter(location => location.id !== id));
    } catch (error) {
      console.error('Xatolik:', error);
    }
  };

  const handleEdit = (location) => {
    setUpdatedLocation(location);
    setEditModal(true);
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <Box
      height="100vh" width="100vw" display="flex" p={1}
      flexDirection="column" alignItems="center" justifyContent="flex-start"
      sx={{ background: "linear-gradient(135deg, #000, #6D6D6D)" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" maxWidth="900px" mb={1}>
        <Input
          disableUnderline
          placeholder="Search location..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '100%', padding: '10px', borderRadius: '8px',
            backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(255, 0, 0, 0.4)',
            fontWeight: 'bold', mr: 2,
          }}
        />
        <Button
          sx={{ bgcolor: 'green', color: '#FFFFFF', fontWeight: 'bold', height: '40px', width: '12rem' }}
          onClick={() => setCreateModal(!createModal)}>
          Create
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <Loading />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%', height: '100%', maxWidth: '100vw', borderRadius: '8px', overflowX: 'auto', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
          <Table sx={{ minWidth: '400px' }}>
            <TableHead>
              <TableRow sx={{ background: '#D32F2F' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>№</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Rasm</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Slug</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Text</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Amallar</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' } }}>
            <Table>
              <TableBody>
                {filteredLocations?.map((location, idx) => (
                  <TableRow key={location.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell align="center">
                      <Box component="img" src={`https://realauto.limsa.uz/api/uploads/images/${location?.image_src}`} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '6px', border: '1px solid #cccccc' }} />
                    </TableCell>
                    <TableCell align="center">{location.name}</TableCell>
                    <TableCell align="center">{location.slug}</TableCell>
                    <TableCell align="center">{location.text}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button onClick={() => handleEdit(location)}>
                          <Edit sx={{ color: 'blue' }} />
                        </Button>
                        <Button onClick={() => deleteCard(location.id)}>
                          <Delete sx={{ color: 'red' }} />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      )}
      {createModal && <CreateLocation getAllLocations={getAllLocations} handleClose={setCreateModal} open={createModal} />}
      {editModal && <EditLocation location={updatedLocation} setEditLocationModal={setEditModal} />}
    </Box>
  );
};

export default Locations;