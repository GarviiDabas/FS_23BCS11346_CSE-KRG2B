import React, { useState, useEffect } from 'react';
import { getMyTokenStatus } from '../services/api';
import { Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
import { useQueue } from '../context/QueueContext'; // 1. Import useQueue

const QueueStatusPage = () => {
  // 2. Get the real token and functions from context
  const { activeToken, fetchTokenStatus } = useQueue(); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      setError(null);
      
      if (!activeToken || !activeToken.tokenId) {
        // This handles the case where you refresh the page
        // (A more advanced version would fetch the user's active token from the backend)
        setError("No active token found. Please join a queue first.");
        setLoading(false);
        return;
      }

      try {
        // 3. Call the API with the REAL token ID from the context
        // This calls http://localhost:8080/api/tokens/YOUR_NEW_TOKEN_ID
        await fetchTokenStatus(activeToken.tokenId);
      } catch (err) {
        setError("Failed to load token status.");
      }
      setLoading(false);
    };

    loadToken();
  }, [activeToken]); // 4. Run this effect when the activeToken changes

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Queue Status
        </Typography>
        {loading ? <CircularProgress /> : (
          // 5. Read the token info directly from the context state
          activeToken ? (
            <Box>
              <Typography variant="h6">Queue:</Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {/* 6. Use the backend DTO names (snake_case) */}
                {activeToken.queue_name}
              </Typography>

              <Typography variant="h6">Your Token Number:</Typography>
              <Typography variant="h3" color="secondary" gutterBottom>
                #{activeToken.token_number}
              </Typography>

              <Typography variant="h6">Now Serving:</Typography>
              <Typography variant="h4" gutterBottom>
                #{activeToken.current_serving}
              </Typography>

              <Typography variant="h6">Estimated Wait:</Typography>
              <Typography variant="h5" gutterBottom>
                ~ {activeToken.estimated_wait_time} minutes
              </Typography>
            </Box>
          ) : (
            <Typography color="error">{error || "No token information."}</Typography>
          )
        )}
      </Paper>
    </Container>
  );
};

export default QueueStatusPage;