// src/pages/Admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import Button from '../../components/common/Button.jsx';

const AdminDashboard = () => {
    const { queues, loading, error, fetchQueues } = useQueue();
    const [selectedQueue, setSelectedQueue] = useState(null);

    // MOCK list of waiting tokens for the selected queue
    const MOCK_WAITING_TOKENS = [
        { token_id: 'VQS-17', token_number: 17, name: "Suresh P.", contact: '98xxxxxx12', issued_time: '9:05 AM', status: 'WAITING' },
        { token_id: 'VQS-18', token_number: 18, name: "Priya K.", contact: '98xxxxxx13', issued_time: '9:15 AM', status: 'WAITING' },
        { token_id: 'VQS-19', token_number: 19, name: "Ravi S.", contact: '98xxxxxx14', issued_time: '9:20 AM', status: 'WAITING' },
    ];
    
    const handleServe = (tokenId) => {
        // Module 2, 5: Logic to serve token (will call queueService.serveToken)
        alert(`MOCK: Serving token ${tokenId}. Next token is now VQS-18.`);
        fetchQueues(); // Refresh queue status
    };

    const handleSkip = (tokenId) => {
        // Module 2, 5: Logic to skip token
        alert(`MOCK: Skipping token ${tokenId}. Moved to end of queue.`);
        fetchQueues(); 
    };

    const handleCancel = (tokenId) => {
        // Module 2, 5: Logic to cancel token
        if (window.confirm(`Are you sure you want to CANCEL token ${tokenId}?`)) {
            alert(`MOCK: Canceling token ${tokenId}.`);
            fetchQueues();
        }
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-blue-800 mb-6">Admin Dashboard (Module 5)</h1>
            
            {loading && <p className="text-blue-500">Loading queues...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="flex space-x-4 mb-8">
                <select 
                    onChange={(e) => setSelectedQueue(queues.find(q => q.queue_id === parseInt(e.target.value)))}
                    className="p-3 border border-gray-300 rounded"
                    value={selectedQueue?.queue_id || ''}
                >
                    <option value="">-- Select Queue to Manage --</option>
                    {queues.map(q => (
                        <option key={q.queue_id} value={q.queue_id}>{q.name}</option>
                    ))}
                </select>
                <Button type="secondary" onClick={fetchQueues}>Refresh Queues</Button>
            </div>

            {selectedQueue && (
                <div className="space-y-8">
                    {/* Queue Status Panel */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                        <h2 className="text-2xl font-bold mb-3">Queue: {selectedQueue.name}</h2>
                        <p>Current Serving Token: <span className="text-xl font-bold text-green-600">{selectedQueue.current_token_number}</span></p>
                        <p>Waiting Count: <span className="text-xl font-bold text-red-600">{MOCK_WAITING_TOKENS.length}</span></p>
                        <Button type="admin" className="mt-4" onClick={() => alert("MOCK: Updating average service time...")}>Update Avg. Service Time</Button>
                    </div>

                    {/* Waiting Tokens List */}
                    <h3 className="text-2xl font-bold mt-6 border-b pb-2">Waiting Customers</h3>
                    <div className="space-y-4">
                        {MOCK_WAITING_TOKENS.map((token, index) => (
                            <div key={token.token_id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center shadow-md">
                                <div>
                                    <p className="font-extrabold text-lg">#{token.token_number} - {token.name}</p>
                                    <p className="text-sm text-gray-600">Issued: {token.issued_time}</p>
                                </div>
                                {/* Module 2, 5: Admin Control Buttons */}
                                <div className="space-x-2">
                                    <Button type="admin" onClick={() => handleServe(token.token_id)}>
                                        {index === 0 ? 'SERVE NEXT' : 'SERVE'}
                                    </Button>
                                    <Button type="secondary" onClick={() => handleSkip(token.token_id)}>Skip</Button>
                                    <Button type="danger" onClick={() => handleCancel(token.token_id)}>Cancel</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;