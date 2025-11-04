import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// 1. IMPORT useAuth TO CHECK THE USER'S ROLE
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';

const QueueCard = ({ queue }) => {
  const navigate = useNavigate();
  // 2. GET THE USER FROM THE AUTH CONTEXT
  const { isAuthenticated, user } = useAuth();
  const { joinQueue, error: queueError } = useQueue();
  const [loading, setLoading] = useState(false);

  const handleJoinQueue = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await joinQueue(queue.queueId);
      setLoading(false);
      navigate('/my-token'); // Navigate on success

    } catch (err) {
      console.error("Failed to join queue:", err);
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {queue.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Avg. Wait: {queue.avgServiceTime} min
        </Typography>
        <Typography variant="h4" color="primary">
          Now Serving: #{queue.currentTokenNumber}
        </Typography>
        
        {queueError && <Alert severity="error" sx={{ mt: 1 }}>{queueError}</Alert>}

      </CardContent>
      <CardActions>
        {/*
          --- THIS IS THE FIX ---
          Only show the "Join Queue" button if:
          1. The user is NOT authenticated (so it will send them to login)
          2. The user IS authenticated AND their role is 'ROLE_CUSTOMER'
        */}
        {(!isAuthenticated || user.role === 'ROLE_CUSTOMER') && (
          <Button 
            size="small" 
            variant="contained" 
            onClick={handleJoinQueue}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Join Queue"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default QueueCard;