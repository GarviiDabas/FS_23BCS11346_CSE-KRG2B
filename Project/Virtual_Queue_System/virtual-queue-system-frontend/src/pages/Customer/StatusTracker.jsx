// src/pages/Customer/StatusTracker.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { queueService } from '../../services/queueService'; // Use the service directly for polling

const StatusTracker = () => {
    const { tokenId } = useParams();
    const [tokenInfo, setTokenInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Module 3: Simulate real-time polling updates
    useEffect(() => {
        setLoading(true);
        
        const fetchStatus = async () => {
            try {
                // Call mock API service for token status
                const data = await queueService.getTokenStatus(tokenId);
                setTokenInfo(data);
            } catch (err) {
                console.error("Failed to fetch token status:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchStatus();

        // Simulate polling (Module 3/4)
        const intervalId = setInterval(fetchStatus, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup
    }, [tokenId]);

    if (loading) {
        return <div className="text-center p-8 text-xl text-blue-600">Loading token status...</div>;
    }

    if (!tokenInfo) {
        return <div className="text-center p-8 text-xl text-red-600">Token ID **{tokenId}** not found.</div>;
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'SERVING': return 'bg-yellow-500 text-white';
            case 'SERVED': return 'bg-green-600 text-white';
            case 'CANCELLED': return 'bg-gray-400 text-white';
            default: return 'bg-red-600 text-white';
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Your Queue Status</h1>
            
            {/* Token Status Badge */}
            <div className={`p-3 rounded-full inline-block mb-6 font-bold ${getStatusStyle(tokenInfo.status)}`}>
                STATUS: {tokenInfo.status}
            </div>

            <div className="space-y-4">
                <p className="text-xl font-semibold">Queue: <span className="text-red-700">{tokenInfo.queue_name}</span></p>
                <p className="text-xl font-semibold">Your Token: <span className="text-2xl font-bold text-red-700">{tokenInfo.token_number}</span></p>
                
                {/* Module 3: Wait Time Estimation */}
                <p className="text-xl font-semibold text-green-700">
                    Estimated Wait Time: <span className="text-3xl font-extrabold">{tokenInfo.estimated_wait_time}</span>
                </p>

                {/* Module 3: Position Tracking */}
                <p className="text-lg text-gray-700 border-t pt-4 mt-4">
                    You are currently **Position {tokenInfo.position}** in the queue.
                </p>

                {/* Module 4: Notification Alert */}
                {tokenInfo.notification_ready && tokenInfo.status === 'WAITING' && (
                    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 mt-6 font-semibold text-left">
                        🔔 **Action Required!** You are **2-3 tokens away** from service. Please prepare to head towards the counter. (Module 4 simulation)
                    </div>
                )}
            </div>
            
            <p className="text-sm text-gray-500 mt-8">Queue updates automatically every 5 seconds.</p>
        </div>
    );
};

export default StatusTracker;