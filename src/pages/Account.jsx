import React, { useState } from 'react';
import { Avatar, Button, Box, TextField, Stack, Typography, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const Account = () => {
  // Foydalanuvchi malumotlarini saqlash uchun holat
  const [name, setName] = useState('John Doe'); // Foydalanuvchi ismi
  const [email, setEmail] = useState('john.doe@example.com'); // Foydalanuvchi emaili
  const [avatar, setAvatar] = useState(null); // Avatar rasm
  const [isEditing, setIsEditing] = useState(false); // Tahrirlash holati

  // Rasmni yuklash funksiyasi
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Rasmni holatda saqlash
      };
      reader.readAsDataURL(file);
    }
  };

  // Tahrir qilish va bekor qilish funksiyalari
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Malumotlarni backendga yubormaymiz hozircha
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Tahrirni bekor qilish
    setName('John Doe');
    setEmail('john.doe@example.com');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={avatar || 'https://via.placeholder.com/150'} // Agar rasm bo'lsa, uni ko'rsatadi
          sx={{ width: 100, height: 100 }}
        />
        <input
          accept="image/*"
          type="file"
          id="avatar-input"
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-input">
          <IconButton component="span">
            <Edit sx={{ color: 'rgb(95, 94, 94)' }} />
          </IconButton>
        </label>
      </Stack>

      <Stack spacing={3} mt={3}>
        <TextField
          label="Ism"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />
      </Stack>

      <Stack direction="row" spacing={2} mt={3}>
        {!isEditing ? (
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Tahrirlash
          </Button>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Saqlash
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
              Bekor qilish
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Account;
