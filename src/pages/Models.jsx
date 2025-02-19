import React, { useState, useEffect } from "react";
import { Box, Input, Stack, Button, Typography } from "@mui/material";
import { deleteModel, getModels } from "../axios/apis";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import CreateModel from "../components/modals/CreateModel";
import EditModel from "../components/modals/EditModel";
import { Delete, Edit } from "@mui/icons-material";
import Loading from "../components/loading/Loading";

const Models = () => {
  const [models, setModels] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updatedModel, setUpdatedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const { data } = await getModels();
        setModels(data);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteModel(id);
      setModels((prev) => prev.filter((model) => model.id !== id));
      console.log(id)
    } catch (error) {
      console.error("Xatolik:", error);
      console.log(id)
    }
  };

  const handleEdit = (model) => {
    setUpdatedModel(model);
    setEditModal(true);
  };

  const filteredModels = models.filter((model) =>
    model?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column"
      alignItems="center" justifyContent="flex-start" p={1} bgcolor='transparent'>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" width="100%" mb={1}>
        <Input
          disableUnderline
          placeholder="Modelni qidiring..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          sx={{
            width: isFocused ? '24rem' : '10rem',
            transition: 'width 0.3s ease-in-out',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.4)',
            fontWeight: 'bold',
            mr: 2}}/>
        <Button
          sx={{ bgcolor: "green", color: "#FFFFFF", fontWeight: "bold", height: "52px", width: "10rem" }}
          onClick={() => setCreateModal(true)}
        >
          Yangi Model
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
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' }}}>
          <Table sx={{ minWidth: "400px" }}>
            <TableHead sx={{position:'sticky', top : '0', zIndex:'2'}}>
              <TableRow sx={{ background: 'rgba(71, 17, 24, 0.98)' }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>№</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Brand</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Model</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredModels.length > 0 ? (
                filteredModels.map((model, idx) => (
                  <TableRow key={model.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell align="center">{model.brand_title}</TableCell>
                    <TableCell align="center">{model.name}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button onClick={() => handleEdit(model)}>
                          <Edit sx={{ color: "blue" }} />
                        </Button>
                        <Button onClick={() => handleDelete(model?.id)}>
                          <Delete sx={{ color: "red" }} />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography sx={{ color: "#fff", fontWeight: "bold" }}>Model topilmadi!</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {createModal && <CreateModel getAllModels={() => getModels().then(({ data }) => setModels(data))} handleClose={setCreateModal} open={createModal} />}
      {editModal && <EditModel model={updatedModel} setEditModelModal={setEditModal} />}
    </Box>
  );
};

export default Models;
