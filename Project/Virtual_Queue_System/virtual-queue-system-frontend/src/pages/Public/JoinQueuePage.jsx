// src/pages/Public/JoinQueuePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import Button from '../../components/common/Button.jsx';

const JoinQueuePage = () => {
  const { queues, loading, error, handleJoinQueue } = useQueue();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedQueueId, setSelectedQueueId] = useState('');

  // Pre-select queue if ID is passed in the URL (from HomePage click)
  useEffect(() => {
    const queueIdParam = searchParams.get('queueId');
    if (queueIdParam) {
      setSelectedQueueId(queueIdParam);
    }
  }, [searchParams]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !contact || !selectedQueueId) {
      alert("Please fill in all details and select a queue.");
      return;
    }
    
    // Module 2: Call the mock API via Context to get a new token
    const resultToken = await handleJoinQueue({ name, contact }, parseInt(selectedQueueId));

    if (resultToken) {
      // Module 3: Redirect to Status Tracker page on success
      navigate(`/status/${resultToken.token_id}`);
    } else {
      alert(error || "Failed to join queue. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-2xl rounded-xl">
      <h1 className="text-3xl font-bold text-red-700 mb-6 border-b pb-3">Get Your Virtual Token</h1>
      
      {loading && <p className="text-blue-500 mb-4">Processing request...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
            <input 
                type="text" 
                placeholder="Your Name (e.g., Garvi Dabas)"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 transition duration-150"
                required
            />
             <input 
                type="text" 
                placeholder="Contact Number (for notifications - Module 4)"
                value={contact} 
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500 transition duration-150"
                required
            />
        </div>

        <div className="relative">
          <select 
            value={selectedQueueId} 
            onChange={(e) => setSelectedQueueId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded appearance-none bg-white focus:ring-red-500 focus:border-red-500 transition duration-150"
            required
            disabled={queues.length === 0}
          >
            <option value="" disabled>--- Select a Queue ---</option>
            {queues.map(queue => (
              <option key={queue.queue_id} value={queue.queue_id}>
                {queue.name} (Next Token: {queue.current_token_number + 1})
              </option>
            ))}
          </select>
        </div>

        <Button type="primary" disabled={loading || queues.length === 0} className="w-full">
          {loading ? 'Adding to Queue...' : 'Get My Token'}
        </Button>
      </form>
      {queues.length === 0 && <p className="text-center text-gray-500 mt-4">No queues available.</p>}
    </div>
  );
};

export default JoinQueuePage;