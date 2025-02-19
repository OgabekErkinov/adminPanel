import React, { useState, useEffect } from 'react';
import { Avatar, Button, Box, TextField, Stack, Typography, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const Account = () => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [surname, setSurname] = useState(localStorage.getItem('surname') || '');
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '998901234567');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setPhone(localStorage.getItem('phone_number') || '998901234567');
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('surname', surname);
    localStorage.setItem('email', email);
    setIsEditing(false);
  };

  return (
    <Box 
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', bgcolor: 'transparent', color: '#ffffff', p: 4
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={avatar || 'https://via.placeholder.com/150'}
            sx={{ width: 120, height: 120, border: '3px dashed red' }}
          />
          <input 
            accept="image/*" type="file" id="avatar-input"
            style={{ display: 'none' }} onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-input">
            <IconButton component="span" sx={{ position: 'absolute', bottom: -10, right: -10, bgcolor: 'white' }}>
              <Edit sx={{ color: 'rgb(95, 94, 94)' }} />
            </IconButton>
          </label>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{phone}</Typography>
      </Stack>

      <Stack spacing={2} width="100%" maxWidth="400px" mt={3}>
        <TextField 
          label="Name" variant="outlined" fullWidth value={name}
          onChange={(e) => setName(e.target.value)} disabled={!isEditing} 
          InputProps={{ sx: { color: 'white', bgcolor: '#1e1e1e', borderRadius: '8px', } }}
        />
        <TextField 
          label="SureName" variant="outlined" fullWidth value={surname}
          onChange={(e) => setSurname(e.target.value)} disabled={!isEditing} 
          InputProps={{ sx: { color: 'white', bgcolor: '#1e1e1e', borderRadius: '8px' } }}
        />
        <TextField
          label="Email" variant="outlined" fullWidth value={email}
          onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} 
          InputProps={{ sx: { color: 'white', bgcolor: '#1e1e1e', borderRadius: '8px'} }}
        />
      </Stack>

      <Stack direction="row" spacing={2} mt={3}>
        {!isEditing ? (
          <Button variant="contained" sx={{ bgcolor: 'red', color: '#fff' }} onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <>
            <Button variant="contained" sx={{ bgcolor: 'green', color: '#fff' }} onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" sx={{ color: 'red', borderColor: 'red' }} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Account;
