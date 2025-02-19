import React, { useEffect, useState } from "react";
import { Box, Paper, Input, Button, Typography, Stack, IconButton, Select, MenuItem } from "@mui/material";
import { Close as CloseIcon, Image as ImageIcon } from "@mui/icons-material";
import Loading from "../loading/Loading";

const CreateModal = ({ open, handleClose, title, fields, submitFunction, fetchOptions = {}, submitText = "Saqlash" }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    if (!open) return;

    const uploadOptions = async () => {
      let newOptions = {};
      for (let key in fetchOptions) {
        try {
          const { data } = await fetchOptions[key]();
          newOptions[key] = data;
        } catch (error) {
          console.error(`${key} ni yuklashda xatolik:`, error);
        }
      }
      setOptions(newOptions);
    };

    uploadOptions();
  }, [open]);

  const handleChange = (e, fieldName) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: e.target.value }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({ ...prev, [fieldName]: file }));
      setPreviews((prev) => ({ ...prev, [fieldName]: URL.createObjectURL(file) }));
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = "Bu maydon majburiy!";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const submissionData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        submissionData.append(key, value);
      });

      await submitFunction(submissionData);
      handleClose();
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    open && (
      <Box position="fixed" top={0} left={0} width="100vw" height="100vh" display="flex" alignItems="center"
           justifyContent="center" bgcolor="rgba(0, 0, 0, 0.6)" zIndex={10}>
        <Paper sx={{ bgcolor: "#212121", color: "#fff", borderRadius: 2, p: 3, width: "90%", maxWidth: "500px" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>{title}</Typography>
            <IconButton onClick={handleClose} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
          </Box>

          <Stack spacing={2}>
            {fields.map((field) => (
              <Box key={field.name}>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>{field.label}</Typography>
                {field.type === "text" || field.type === "slug" ? (
                  <Input disableUnderline sx={{ height: "48px", width: "100%", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }}
                         value={formValues[field.name] || ""} 
                         onChange={(e) => handleChange(e, field.name)} 
                         placeholder={field.placeholder} />
                ) : field.type === "select" ? (
                  <Select value={formValues[field.name] || ""} onChange={(e) => handleChange(e, field.name)} displayEmpty fullWidth
                          sx={{ height: "48px", backgroundColor: "#f5f5f5", borderRadius: 1, p: 1 }}>
                    <MenuItem value="" disabled>{field.placeholder}</MenuItem>
                    {(options[field.name] || []).map((option) => (
                      <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
                    ))}
                  </Select>
                ) : field.type === "file" ? (
                  <label htmlFor={field.name}>
                    <Box sx={{ border: "2px dashed #D32F2F", borderRadius: 2, textAlign: "center", p: 2, cursor: "pointer" }}>
                      {previews[field.name] ? (
                        <img src={previews[field.name]} alt="Preview"
                             style={{ width: "100%", height: "12rem", borderRadius: 8, objectFit: "cover" }} />
                      ) : <ImageIcon sx={{ fontSize: 40, color: "#D32F2F" }} />}
                      <Input id={field.name} type="file" accept="image/*" 
                             onChange={(e) => handleImageChange(e, field.name)} sx={{ display: "none" }} />
                    </Box>
                  </label>
                ) : null}
                {errors[field.name] && <Typography sx={{ color: "#D32F2F", mt: 1 }}>{errors[field.name]}</Typography>}
              </Box>
            ))}
            <Box display="flex" justifyContent={loading ? "center" : "flex-end"}>
              <Button sx={{ bgcolor: loading ? "transparent" : "#D32F2F", color: "#FFFFFF", borderRadius: 1, padding: "10px 20px",
                            "&:hover": { bgcolor: loading ? "transparent" : "#B71C1C" } }} 
                      onClick={handleSubmit} disabled={loading}>
                {loading ? <Loading /> : submitText}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    )
  );
};

export default CreateModal;
