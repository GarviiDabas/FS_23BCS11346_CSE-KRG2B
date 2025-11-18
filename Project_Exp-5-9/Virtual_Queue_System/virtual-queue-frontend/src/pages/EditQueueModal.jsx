import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch
} from '@mui/material';
import { updateQueue } from "../services/api"; // Make sure this path is correct

/**
 * A modal component for editing an existing queue's details.
 */
const EditQueueModal = ({ open, onClose, queue, onQueueUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    avgServiceTime: 0,
    isActive: true
  });

  // When the 'queue' prop changes (when the modal is opened),
  // update the form's internal state to match that queue.
  useEffect(() => {
    if (queue) {
      setFormData({
        name: queue.name || '',
        avgServiceTime: queue.avgServiceTime || 0,
        isActive: queue.isActive ?? true // This correctly reads the 'isActive' from the DB
      });
    }
  }, [queue]);

  // Handler for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for the "Active" switch
  // This robustly flips the state from true-to-false or false-to-true.
  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isActive: !prev.isActive 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      
      // ✅ THIS IS THE FIX:
      // We are creating an object with the key 'active'
      // and giving it the value from your 'isActive' state.
      const updatedData = { 
        name: name, 
        avgServiceTime: avgServiceTime, 
        active: isActive  // The key is 'active', the value is from state
      };

      await updateQueue(queue.queueId, updatedData);
      onQueueUpdated(); // Tell the parent page to refresh its list
      onClose(); // Close the modal
    } catch (err) {
      setError("Failed to update queue.");
    }
  };
  
// Handler for the "Save" button
  const handleSave = async () => {
    if (!queue) return; // Safety check

    try {
      // Send the updated data to the backend
      await updateQueue(queue.queueId, { 
        name: formData.name,
        avgServiceTime: formData.avgServiceTime,
        
        // ✅ THE FIX:
        // The JSON key 'active' matches your Java setActive() setter.
        active: formData.isActive 
      });
      
      onQueueUpdated(); // Tell the parent page to refresh its list
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error updating queue:", err);
      alert("Failed to update queue. Please check console.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Queue: {queue?.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Queue Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          autoFocus
        />
        <TextField
          label="Average Service Time (in minutes)"
          name="avgServiceTime"
          type="number"
          value={formData.avgServiceTime}
          onChange={handleChange}
          fullWidth
          margin="dense"
          InputProps={{ inputProps: { min: 0 } }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.isActive}
              onChange={handleToggle}
              color="primary"
            />
          }
          // ✅ This label is now dynamic based on your 'formData' state
          label={formData.isActive ? "Queue is Active" : "Queue is Inactive"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQueueModal;