import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Switch, FormControlLabel, Alert, IconButton } from '@mui/material';
import { updateQueue } from '../../services/api';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
  border: 'none',
  p: 0,
};

const EditQueueModal = ({ open, onClose, queue, onQueueUpdated }) => {
  const [name, setName] = useState('');
  const [avgServiceTime, setAvgServiceTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queue) {
      setName(queue.name);
      setAvgServiceTime(queue.avgServiceTime);
      setIsActive(queue.isActive);
    }
  }, [queue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const updatedData = { name, avgServiceTime, isActive };
      await updateQueue(queue.queueId, updatedData);
      onQueueUpdated();
      onClose();
    } catch (err) {
      setError("Failed to update queue.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box sx={style}>
        {/* Header */}
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            px: 4,
            py: 3,
            borderRadius: '24px 24px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              sx={{ 
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EditIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Edit Queue
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {queue?.name}
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '12px',
                animation: 'slideInLeft 0.3s ease-out',
              }}
            >
              {error}
            </Alert>
          )}
          
          <TextField
            label="Queue Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  }
                }
              }
            }}
          />

          <TextField
            label="Average Service Time (minutes)"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={avgServiceTime}
            onChange={(e) => setAvgServiceTime(Number(e.target.value))}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  }
                }
              }
            }}
          />

          <Box 
            sx={{ 
              p: 2.5,
              background: '#f8fafc',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              mb: 3,
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: '#667eea',
                background: '#ffffff',
              }
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#667eea',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#667eea',
                    },
                  }}
                />
              }
              label={
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 600,
                    color: isActive ? '#10b981' : '#64748b',
                  }}
                >
                  {isActive ? "Queue is Active" : "Queue is Inactive"}
                </Typography>
              }
            />
          </Box>

          <Button 
            type="submit" 
            fullWidth
            variant="contained" 
            size="large"
            startIcon={<SaveIcon />}
            sx={{
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1.1rem',
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
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditQueueModal;