import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMyTokenStatus, cancelToken } from '../services/api';
import { useQueue } from '../context/QueueContext'; // Only used to get the initial ID

const QueueStatusPage = () => {
  const { activeToken } = useQueue(); // Get the token from the "Join Queue" click
  const [tokenInfo, setTokenInfo] = useState(null); // Local state for this page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // This function loads the token status
    const loadToken = async (tokenId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyTokenStatus(tokenId); 
        setTokenInfo(data); // Set our local state
      } catch (err) {
        setError("Failed to load token status.");
      }
      setLoading(false);
    };

    // Get the ID from the token object we got from "Join Queue"
    const tokenId = activeToken?.tokenId;

    if (tokenId) {
      loadToken(tokenId);
    } else {
      // This handles a page refresh
      setError("No active token found. Please join a queue first.");
      setLoading(false);
    }
  }, [activeToken]); // Run when activeToken changes

  // This is the fixed "Leave Queue" function
  const handleCancel = async () => {
    setError(null);
    
    // It now reads from its own 'tokenInfo' state
    if (!tokenInfo || !tokenInfo.token_id) {
        setError("Cannot find token ID to cancel.");
        return;
    }

    try {
      // It uses the correct 'token_id' (with underscore)
      await cancelToken(tokenInfo.token_id);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel token.");
    }
  };

  // This function decides what to render
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }
    
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }

    if (tokenInfo) {
      return (
        <Box>
          <Typography variant="h6">Queue:</Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {tokenInfo.queue_name}
          </Typography>
          <Typography variant="h6">Your Token Number:</Typography>
          <Typography variant="h3" color="secondary" gutterBottom>
            #{tokenInfo.token_number}
          </Typography>
          <Typography variant="h6">Now Serving:</Typography>
          <Typography variant="h4" gutterBottom>
            #{tokenInfo.current_serving}
          </Typography>
          <Typography variant="h6">Estimated Wait:</Typography>
          <Typography variant="h5" gutterBottom>
            ~ {tokenInfo.estimated_wait_time} minutes
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 3 }}
            onClick={handleCancel}
            // It checks the 'status' from its own state
            disabled={tokenInfo.status !== 'WAITING'}
          >
            Leave Queue
          </Button>
        </Box>
      );
    }
    
    return <Typography>No token information.</Typography>;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Queue Status
        </Typography>
        {renderContent()}
      </Paper>
    </Container>
  );
};

export default QueueStatusPage;