import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const FriendList = ({ friends, onUpdate, onDelete }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [editForm, setEditForm] = useState({
    name: '',
    role: '',
    description: '',
    gender: '',
  });

  const handleEditClick = (friend) => {
    setSelectedFriend(friend);
    setEditForm({
      name: friend.name,
      role: friend.role,
      description: friend.description,
      gender: friend.gender,
    });
    setEditDialog(true);
  };

  const handleEditClose = () => {
    setEditDialog(false);
    setSelectedFriend(null);
  };

  const handleEditSubmit = () => {
    onUpdate(selectedFriend.id, editForm);
    handleEditClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (friends.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No friends added yet. Start by adding a new friend!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} lg={4} key={friend.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardMedia
                component="img"
                height={isMobile ? "150" : "200"}
                image={friend.imgUrl || 'https://via.placeholder.com/200'}
                alt={friend.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ mb: 1 }}>
                    {friend.name}
                  </Typography>
                  <Chip 
                    label={friend.role}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {friend.description}
                </Typography>
              </CardContent>
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <IconButton 
                  onClick={() => handleEditClick(friend)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => onDelete(friend.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={editDialog} 
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Friend</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 1 }}>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              value={editForm.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              fullWidth
              value={editForm.role}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editForm.description}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="gender"
              label="Gender"
              fullWidth
              select
              SelectProps={{ native: true }}
              value={editForm.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleEditClose} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FriendList;
