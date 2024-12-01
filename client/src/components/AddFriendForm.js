import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

const AddFriendForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    description: '',
    gender: 'male',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      role: '',
      description: '',
      gender: 'male',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Friend
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            fullWidth
            required
            value={form.role}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            required
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            fullWidth
            required
            select
            SelectProps={{ native: true }}
            value={form.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Friend
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddFriendForm;
