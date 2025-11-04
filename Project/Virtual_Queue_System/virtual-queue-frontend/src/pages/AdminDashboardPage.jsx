import React, { useState, useEffect } from 'react';
import { getAllQueues, serveNextToken } from '../services/api';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // ✅ Add this import

const AdminDashboardPage = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadQueues = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllQueues();
      setQueues(data);
    } catch (err) {
      console.error("Failed to load queues:", err);
      setError("Failed to load queues.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadQueues();
  }, []);

  const handleServeNext = async (queueId) => {
    try {
      await serveNextToken(queueId);
      loadQueues(); // Reload queue data to update token number
    } catch (err) {
      console.error("Failed to serve next token:", err);
      setError("Failed to update token.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header + Manage Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {/* ✅ New Manage Queues Button */}
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/admin/manage-queues"
        >
          Manage Queues
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading queues...</Typography>
      ) : (
        <Grid container spacing={3}>
          {queues.map((queue) => (
            <Grid item xs={12} md={6} key={queue.queueId}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{queue.name}</Typography>
                <Typography>
                  Status: {queue.isActive ? 'Active' : 'Inactive'}
                </Typography>
                <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                  Now Serving: #{queue.currentTokenNumber}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleServeNext(queue.queueId)}
                >
                  Serve Next Token
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default AdminDashboardPage;
