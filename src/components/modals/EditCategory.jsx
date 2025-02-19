import React, { useState, useEffect } from "react";
import { Box, Paper, Input, Button, Typography, Stack, IconButton, Modal } from "@mui/material";
import { Close as CloseIcon, Image as ImageIcon } from "@mui/icons-material";
import { updateCategory } from "../../axios/apis";
import Loading from "../loading/Loading";

const EditCategory = ({ category, setEditModal }) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(category?.image_src ? `https://realauto.limsa.uz/api/uploads/images/${category.image_src}` : null);
    const [name_en, setName_en] = useState(category?.name_en || "");
    const [name_ru, setName_ru] = useState(category?.name_ru || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleUpdateCategory = async () => {
        if (!name_en.trim() || !name_ru.trim()) {
            setErrorMessage("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);

        try {
            const formData = new FormData();
            if (image) formData.append("images", image);
            formData.append("name_en", name_en);
            formData.append("name_ru", name_ru);

            await updateCategory(formData, category?.id);
            setEditModal(false);
        } catch (error) {
            console.error("Xatolik:", error);
            setErrorMessage("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={Boolean(category)} onClose={() => setEditModal(false)} 
               sx={{ display: "flex", alignItems: "center", justifyContent: "center", bgcolor:"rgba(0, 0, 0, 0.6)" }}>
            <Box bgcolor="#424242" p={3} borderRadius={2} boxShadow={24} 
                 width={{ xs: "90vw", sm: "60vw", md: "50vw" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#F44336" }}>Kategoriyani tahrirlash</Typography>
                    <IconButton onClick={() => setEditModal(false)} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Stack spacing={2} alignItems="center">
                    <Box
                        component="label"
                        sx={{ border: "2px dashed #F44336", borderRadius: 2, textAlign: "center", p: 2, cursor: "pointer", width: "100%", maxWidth: "300px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover" }} />
                        ) : (
                            <ImageIcon sx={{ fontSize: 40, color: "#F44336" }} />
                        )}
                        <Input type="file" accept="image/*" onChange={handleImageChange} sx={{ display: "none" }} />
                    </Box>

                    <Box width="100%">
                        <Typography sx={{ fontWeight: "bold", mb: 1 }}>Kategoriya nomi (Inglizcha)</Typography>
                        <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }} value={name_en} onChange={(e) => setName_en(e.target.value)} placeholder="Kategoriya nomini kiriting" />
                    </Box>

                    <Box width="100%">
                        <Typography sx={{ fontWeight: "bold", mb: 1 }}>Kategoriya nomi (Ruscha)</Typography>
                        <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }} value={name_ru} onChange={(e) => setName_ru(e.target.value)} placeholder="Kategoriya nomini kiriting" />
                    </Box>
                </Stack>

                {errorMessage && <Typography color="error" textAlign="center" mt={2}>{errorMessage}</Typography>}

                <Stack direction="row" justifyContent={isLoading ? "center" : 'flex-end'} mt={2}>
                    {isLoading ? (
                        <Loading/>
                    ) : (
                        <Button variant="contained" 
                                sx={{ bgcolor: "#F44336", "&:hover": { bgcolor: "#D32F2F" }, color: "#fff" }} 
                                onClick={handleUpdateCategory}>
                            Yangilash
                        </Button>
                    )}
                </Stack>
            </Box>
        </Modal>
    );
};

export default EditCategory;
