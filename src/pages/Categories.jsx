import React, { useState, useEffect } from 'react';
import { Box, Input, Stack, Button, Typography } from '@mui/material';
import { deleteCategory, getCategories } from '../axios/apis';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateCategory from '../components/modals/CreateCategory';
import { Delete, Edit } from '@mui/icons-material';
import EditCategory from '../components/modals/EditCategory';
import Loading from '../components/loading/Loading';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [updatedCateg, setUpdatedCateg] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const filteredCategories = categories.filter((category) => category?.name_en.toLowerCase().includes(searchTerm.toLowerCase()));

  const getAllCategories = async () => {
    setIsLoading(true);
    const { data } = await getCategories();
    setCategories(data);
    setIsLoading(false);
  };

  const deleteCard = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Xatolik:', error);
    }
  };

  const handleEdit = (categ) => {
    setUpdatedCateg(categ);
    setEditModal(true);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Box height="100%" width="100%" display="flex" p={1}
      flexDirection="column" alignItems="center" justifyContent="flex-start" bgcolor='transparent'>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" width="100%" mb={1}>
        <Input disableUnderline placeholder="Search category..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          sx={{ width: isFocused ? '24rem' : '10rem', transition: 'width 0.3s ease-in-out',
            padding: '10px', borderRadius: '8px', backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.4)', fontWeight: 'bold', mr: 2 }} />
         <Button
          sx={{ bgcolor: 'green', color: '#FFFFFF', fontWeight: 'bold', height: '52px', width: '12rem' }}
          onClick={() => setCreateModal(!createModal)}>
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
          sx={{
            width: '100%',
            height: '100%',
            maxHeight:'80vh',
            borderRadius: '8px',
            overflowY: 'auto',
            boxSizing: 'border-box',
            border: '1px solid #ddd',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
          }}
        >
          <Table sx={{ minWidth: '400px' }}>
            <TableHead sx={{position:'sticky', top : '0', zIndex:'2'}}>
              <TableRow sx={{ background: 'rgba(71, 17, 24, 0.98)' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>№</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Picture</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Name (English)</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Name (Russia)</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Events</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {filteredCategories?.map((category, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell align="center">
                      <Box
                        component="img"
                        src={`https://realauto.limsa.uz/api/uploads/images/${category?.image_src}`}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '1px solid #cccccc',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{category.name_en}</TableCell>
                    <TableCell align="center">{category.name_ru}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button onClick={() => handleEdit(category)}>
                          <Edit sx={{ color: 'blue' }} />
                        </Button>
                        <Button onClick={() => deleteCard(category.id)}>
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
      {createModal && <CreateCategory getAllCategories={getAllCategories} handleClose={setCreateModal} open={createModal} />}
      {editModal && <EditCategory category={updatedCateg} setEditModal={setEditModal} />}
    </Box>
  );
};

export default Categories;
