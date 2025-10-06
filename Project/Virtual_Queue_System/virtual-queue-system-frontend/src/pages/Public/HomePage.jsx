// src/pages/Public/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext'; 
import Button from '../../components/common/Button.jsx';

const HomePage = () => {
  // Access data and functions from the QueueContext
  const { queues, loading, error } = useQueue(); 
  const navigate = useNavigate();

  // Handler to navigate to the join page, pre-selecting the queue ID
  const handleJoinClick = (queueId) => {
      navigate(`/join?queueId=${queueId}`);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-red-700 mb-2">
        Welcome to VQS - Remote Queue System
      </h1>
      <p className="text-xl text-gray-600 mb-10">
        Discover, Learn, Empower. Join a virtual queue from anywhere.
      </p>

      {/* Loading and Error States */}
      {loading && <p className="text-center p-6 text-xl text-blue-500">Loading available queues...</p>}
      {error && <p className="text-center p-6 text-xl text-red-500">Error fetching data: {error}</p>}
      
      {/* Module 1: Queue Listing */}
      {!loading && queues.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-2">Active Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {queues.map(queue => (
              <div 
                key={queue.queue_id} 
                className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-red-500 hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{queue.name}</h3>
                <div className="space-y-1 text-gray-700 text-sm">
                    <p>Current Serving Token: <span className="font-bold text-lg text-green-600">{queue.current_token_number}</span></p>
                    <p>Expected Service Time: {queue.avg_service_time} minutes/customer</p>
                </div>
                
                {/* Uses the reusable Button component */}
                <Button 
                    type="primary" 
                    className="mt-6 w-full"
                    onClick={() => handleJoinClick(queue.queue_id)}
                >
                    Join {queue.name} Queue
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No Queues Available State */}
      {!loading && queues.length === 0 && (
          <div className="p-10 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-medium text-gray-500">
                  Currently, no virtual queues are active. Please check back shortly.
              </p>
          </div>
      )}
    </div>
  );
};

export default HomePage;