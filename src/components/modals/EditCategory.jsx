import React, { useState, useEffect } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input, Button, Stack, Typography, Modal, CircularProgress } from "@mui/material";
import { updateCategory } from "../../axios/apis";
import Loading from "../loading/Loading";
import { Close } from "@mui/icons-material";

const EditCategory = ({ category, setEditModal }) => {
    const [image, setImage] = useState(null);
    const [name_en, setName_en] = useState("");
    const [name_ru, setName_ru] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setName_en(category.name_en || "");
            setName_ru(category.name_ru || "");
        }
    }, [category]);

    const handleUpdateCategory = async () => {
        if (!name_en.trim() || !name_ru.trim()) {
            setErrorMessage("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }
        setErrorMessage("");
        setIsLoading(true); // ⏳ Loading boshlanishi

        try {
            const updatedDatas = new FormData();
            if (image) updatedDatas.append("images", image);
            updatedDatas.append("name_en", name_en);
            updatedDatas.append("name_ru", name_ru);

            await updateCategory(updatedDatas, category?.id);
            setEditModal(false);
        } catch (error) {
            console.log("Xatolik:", error);
            setErrorMessage("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring!");
        } finally {
            setIsLoading(false); // ⏳ Loading tugashi
        }
    };

    return (
        <Modal open={Boolean(category)} onClose={() => {}} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box bgcolor="#424242" p={3} borderRadius={2} boxShadow={24} width={{ xs: "90vw", sm: "60vw", md: "50vw" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#F44336" }}>Kategoriyani tahrirlash</Typography>
                    <Button onClick={() => setEditModal(false)} sx={{ color: "#fff" }}>
                        <Close />
                    </Button>
                </Stack>

                <Stack direction="row" spacing={3} alignItems="center">
                    <Box 
                        component="img" 
                        height="120px" 
                        width="120px" 
                        src={`https://realauto.limsa.uz/api/uploads/images/${category?.image_src}`} 
                        sx={{ border: '3px solid #F44336', borderRadius: '50%', padding: '5px' }} // Yangi border qo'shildi
                    />
                    <Stack>
                        <Typography>{category?.name_en}</Typography>
                        <Typography>{category?.name_ru}</Typography>
                    </Stack>
                </Stack>

                <TableContainer component={Paper} sx={{ mt: 2, bgcolor: "#333333" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#F44336" }}>Image</TableCell>
                                <TableCell align="center" sx={{ color: "#F44336" }}>Nomi (inglizcha)</TableCell>
                                <TableCell align="center" sx={{ color: "#F44336" }}>Nomi (ruscha)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} sx={{ color: "#F44336" }} />
                                </TableCell>
                                <TableCell align="center">
                                    <Input value={name_en} onChange={(e) => setName_en(e.target.value)} placeholder="Enter name in English" sx={{ bgcolor: "#555555", color: "#fff" }} />
                                </TableCell>
                                <TableCell align="center">
                                    <Input value={name_ru} onChange={(e) => setName_ru(e.target.value)} placeholder="Enter name in Russian" sx={{ bgcolor: "#555555", color: "#fff" }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {errorMessage && <Typography color="error" textAlign="center" mt={2}>{errorMessage}</Typography>}

                <Stack direction="row" justifyContent={isLoading ? "center" : 'flex-end'} mt={2}>
                    {isLoading ? (
                        <Loading /> 
                    ) : (
                        <Button variant="contained" sx={{ bgcolor: "#F44336", "&:hover": { bgcolor: "#D32F2F" }, color: "#fff" }} onClick={handleUpdateCategory}>
                            Yangilash
                        </Button>
                    )}
                </Stack>
            </Box>
        </Modal>
    );
};

export default EditCategory;
