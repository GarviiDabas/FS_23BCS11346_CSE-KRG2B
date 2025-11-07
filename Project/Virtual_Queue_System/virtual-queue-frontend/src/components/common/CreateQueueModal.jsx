import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Switch, FormControlLabel, Alert, IconButton } from '@mui/material';
import { createQueue } from '../../services/api';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';

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

const CreateQueueModal = ({ open, onClose, onQueueCreated }) => {
  const [name, setName] = useState('');
  const [avgServiceTime, setAvgServiceTime] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name.trim()) {
      setError("Queue name is required.");
      setLoading(false);
      return;
    }
    if (avgServiceTime <= 0) {
      setError("Average service time must be greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const newQueueData = { 
        name: name.trim(), 
        avgServiceTime,
        active: isActive
      };
      await createQueue(newQueueData);
      
      setName('');
      setAvgServiceTime(5);
      setIsActive(true);
      
      onQueueCreated();
      onClose();
    } catch (err) {
      console.error("Failed to create queue:", err);
      setError(err.response?.data?.message || "Failed to create queue.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setAvgServiceTime(5);
    setIsActive(true);
    setError(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box sx={style}>
        {/* Header */}
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
              <QueuePlayNextIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                Create New Queue
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Add a new queue to the system
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose}
            disabled={loading}
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
            placeholder="e.g., Clinic OPD, Pharmacy"
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
                    borderColor: '#10b981',
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
            inputProps={{ min: 1 }}
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
                    borderColor: '#10b981',
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
                borderColor: '#10b981',
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
                      color: '#10b981',
                      '&:hover': {
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#10b981',
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

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              fullWidth
              variant="contained" 
              size="large"
              startIcon={loading ? null : <AddIcon />}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0ea672 0%, #047857 100%)',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.6)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: '#e2e8f0',
                  color: '#94a3b8',
                }
              }}
            >
              {loading ? "Creating..." : "Create Queue"}
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={handleClose}
              disabled={loading}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '12px',
                borderColor: '#e2e8f0',
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'none',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#94a3b8',
                  background: '#f8fafc',
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateQueueModal;
