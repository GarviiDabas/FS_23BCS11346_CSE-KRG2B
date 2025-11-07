import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, CircularProgress, Alert, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const QueueCard = ({ queue }) => {
  const navigate = useNavigate();
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
      navigate('/my-token');
    } catch (err) {
      console.error("Failed to join queue:", err);
      setLoading(false);
    }
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '20px',
        border: '2px solid #e2e8f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
          borderColor: '#667eea',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px 20px 0 0',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Queue Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 700,
              color: '#1e293b',
              fontSize: '1.5rem',
            }}
          >
            {queue.name}
          </Typography>
          <Chip 
            label="Active" 
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '24px',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </Box>

        {/* Current Token - Big Display */}
        <Box 
          sx={{ 
            textAlign: 'center',
            py: 3,
            mb: 3,
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            borderRadius: '16px',
            border: '2px solid #e0e7ff',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <ConfirmationNumberIcon sx={{ fontSize: 28, color: '#667eea', mr: 1 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Now Serving
            </Typography>
          </Box>
          <Typography 
            variant="h2" 
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '3rem',
              lineHeight: 1,
            }}
          >
            #{queue.currentTokenNumber}
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box 
            sx={{ 
              flex: 1,
              p: 2,
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 18, color: '#f59e0b', mr: 0.5 }} />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#64748b',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                Avg Wait
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1e293b',
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              {queue.avgServiceTime} min
            </Typography>
          </Box>

          <Box 
            sx={{ 
              flex: 1,
              p: 2,
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <TrendingUpIcon sx={{ fontSize: 18, color: '#10b981', mr: 0.5 }} />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#64748b',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                Status
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#10b981',
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              Available
            </Typography>
          </Box>
        </Box>

        {queueError && (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 2,
              borderRadius: '12px',
              animation: 'slideInLeft 0.3s ease-out',
            }}
          >
            {queueError}
          </Alert>
        )}
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        {(!isAuthenticated || user.role === 'ROLE_CUSTOMER') && (
          <Button 
            fullWidth
            size="large"
            variant="contained"
            onClick={handleJoinQueue}
            disabled={loading}
            endIcon={loading ? null : <ArrowForwardIcon />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '12px',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: '#e2e8f0',
                color: '#94a3b8',
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              "Join Queue"
            )}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default QueueCard;