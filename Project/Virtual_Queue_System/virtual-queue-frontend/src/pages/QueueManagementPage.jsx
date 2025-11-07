import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Chip,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon, QueuePlayNext as QueueIcon } from '@mui/icons-material';
import { getAllQueues } from '../services/api';
import EditQueueModal from '../components/common/EditQueueModal';
import CreateQueueModal from '../components/common/CreateQueueModal';

const QueueManagementPage = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState(null);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleOpenEditModal = (queue) => {
    setSelectedQueue(queue);
    setIsEditModalOpen(true);
  };
  
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedQueue(null);
  };
  
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleQueueUpdated = () => {
    handleCloseEditModal();
    loadQueues();
  };
  
  const handleQueueCreated = () => {
    handleCloseCreateModal();
    loadQueues();
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '80vh',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 3,
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: '#667eea' }} />
        <Typography sx={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>
          Loading queues...
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 5,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              }}
            >
              <QueueIcon sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <Box>
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  letterSpacing: '-1px',
                }}
              >
                Queue Management
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
                Manage and monitor all queues
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '12px',
              px: 3,
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
              }
            }}
          >
            Create New Queue
          </Button>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: '16px',
              animation: 'slideInLeft 0.3s ease-out',
            }}
          >
            {error}
          </Alert>
        )}
        
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid #e2e8f0',
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          <List sx={{ p: 0 }}>
            {queues.map((queue, index) => (
              <React.Fragment key={queue.queueId}>
                <ListItem
                  sx={{
                    py: 3,
                    px: 4,
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                      transform: 'translateX(4px)',
                    }
                  }}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="edit" 
                      onClick={() => handleOpenEditModal(queue)}
                      sx={{
                        backgroundColor: '#e0e7ff',
                        color: '#667eea',
                        transition: 'all 0.3s',
                        '&:hover': {
                          backgroundColor: '#667eea',
                          color: 'white',
                          transform: 'rotate(15deg) scale(1.1)',
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Box 
                      sx={{ 
                        width: 8,
                        height: 40,
                        borderRadius: '4px',
                        background: queue.isActive 
                          ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(180deg, #94a3b8 0%, #64748b 100%)',
                      }}
                    />
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            color: '#1e293b',
                            mb: 0.5,
                          }}
                        >
                          {queue.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                          <Chip 
                            label={queue.isActive ? 'Active' : 'Inactive'} 
                            size="small"
                            sx={{
                              background: queue.isActive 
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                          <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Avg. Wait: {queue.avgServiceTime} min
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Now Serving: #{queue.currentTokenNumber}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </ListItem>
                {index < queues.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {isEditModalOpen && selectedQueue && (
          <EditQueueModal
            open={isEditModalOpen}
            onClose={handleCloseEditModal}
            queue={selectedQueue}
            onQueueUpdated={handleQueueUpdated}
          />
        )}
        
        <CreateQueueModal
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onQueueCreated={handleQueueCreated}
        />
      </Container>
    </Box>
  );
};

export default QueueManagementPage;