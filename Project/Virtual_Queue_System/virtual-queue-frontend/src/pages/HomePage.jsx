import React, { useState, useEffect } from 'react';
import { getActiveQueues } from '../services/api';
import { Container, Typography, CircularProgress, Box, Grid } from '@mui/material';
import QueueCard from '../components/common/QueueCard';

const HomePage = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQueues = async () => {
      try {
        setLoading(true);
        const data = await getActiveQueues();
        setQueues(data);
      } catch (err) {
        setError("Failed to load queues.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadQueues();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Queues
      </Typography>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        // FIX: Replaced old <Grid container> with new MUI v5 <Grid> syntax
        <Grid container spacing={3}>
          {queues.length > 0 ? (
            queues.map((queue) => (
              // FIX: Replaced <Grid item> with new MUI v5 <Grid> syntax
              <Grid item xs={12} md={6} lg={4} key={queue.queueId}>
                <QueueCard queue={queue} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ margin: 2 }}>
              No active queues available at this time.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;