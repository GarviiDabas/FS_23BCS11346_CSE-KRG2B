import React, { useState, useEffect } from 'react';
import { getActiveQueues } from '../services/api';
import { Container, Typography, CircularProgress, Box, Grid, Paper } from '@mui/material';
import QueueCard from '../components/common/QueueCard';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PeopleIcon from '@mui/icons-material/People';

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
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            animation: 'fadeIn 0.8s ease-out',
          }}
        >
          <Box 
            sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
              mb: 3,
            }}
          >
            <QueuePlayNextIcon sx={{ fontSize: 48, color: 'white' }} />
          </Box>
          
          <Typography 
            variant="h2" 
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-1px',
            }}
          >
            Available Queues
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#64748b', 
              fontWeight: 400,
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Join a queue and skip the wait. Get real-time updates on your position.
          </Typography>
        </Box>
        
        {/* Loading State */}
        {loading && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', 
              py: 12,
              gap: 3,
            }}
          >
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                color: '#667eea',
                animation: 'pulse 2s ease-in-out infinite',
              }} 
            />
            <Typography 
              sx={{ 
                color: '#64748b',
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              Loading queues...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              borderRadius: '24px',
              border: '2px solid #fca5a5',
              animation: 'scaleIn 0.3s ease-out',
            }}
          >
            <ErrorOutlineIcon 
              sx={{ 
                fontSize: 64, 
                color: '#ef4444',
                mb: 2,
              }} 
            />
            <Typography 
              variant="h5" 
              color="#dc2626"
              fontWeight={600}
              gutterBottom
            >
              {error}
            </Typography>
            <Typography 
              color="#991b1b"
              sx={{ mt: 1 }}
            >
              Please try refreshing the page or contact support.
            </Typography>
          </Paper>
        )}

        {/* Queues Grid */}
        {!loading && !error && (
          <Box sx={{ animation: 'fadeIn 0.6s ease-out' }}>
            {queues.length > 0 ? (
              <Grid container spacing={4}>
                {queues.map((queue, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    lg={4} 
                    key={queue.queueId}
                    sx={{
                      animation: 'slideInLeft 0.5s ease-out',
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both',
                    }}
                  >
                    <QueueCard queue={queue} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper 
                elevation={0}
                sx={{ 
                  p: 8,
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: '24px',
                  border: '2px dashed #e2e8f0',
                  animation: 'scaleIn 0.3s ease-out',
                }}
              >
                <PeopleIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: '#cbd5e1',
                    mb: 2,
                  }} 
                />
                <Typography 
                  variant="h5" 
                  color="#64748b"
                  fontWeight={600}
                  gutterBottom
                >
                  No Active Queues
                </Typography>
                <Typography 
                  color="#94a3b8"
                  sx={{ mt: 1 }}
                >
                  There are no active queues available at this time. Please check back later.
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;