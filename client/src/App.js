import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, useTheme, useMediaQuery, Paper } from '@mui/material';
import FriendList from './components/FriendList';
import AddFriendForm from './components/AddFriendForm';
import { getAllFriends, createFriend, updateFriend, deleteFriend } from './services/api';

function App() {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchFriends = async () => {
    try {
      const data = await getAllFriends();
      setFriends(data);
    } catch (err) {
      setError('Failed to fetch friends');
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleAddFriend = async (friendData) => {
    try {
      await createFriend(friendData);
      fetchFriends();
    } catch (err) {
      setError('Failed to add friend');
    }
  };

  const handleUpdateFriend = async (id, friendData) => {
    try {
      await updateFriend(id, friendData);
      fetchFriends();
    } catch (err) {
      setError('Failed to update friend');
    }
  };

  const handleDeleteFriend = async (id) => {
    try {
      await deleteFriend(id);
      fetchFriends();
    } catch (err) {
      setError('Failed to delete friend');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 4 
          }}
        >
          Friends Management
        </Typography>
        
        {error && (
          <Typography 
            color="error" 
            align="center" 
            gutterBottom
            sx={{ mb: 3 }}
          >
            {error}
          </Typography>
        )}

        <Grid 
          container 
          spacing={3}
          direction={isMobile ? 'column-reverse' : 'row'}
        >
          <Grid 
            item 
            xs={12} 
            md={8} 
            sx={{ 
              height: '100%',
              overflowY: 'auto'
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                mb: 3,
                fontSize: { xs: '1.5rem', sm: '1.8rem' }
              }}
            >
              All Friends ({friends.length})
            </Typography>
            <FriendList
              friends={friends}
              onUpdate={handleUpdateFriend}
              onDelete={handleDeleteFriend}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <AddFriendForm onSubmit={handleAddFriend} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
