import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getQueueDetails } from '../services/api'; // We will add this next

const QueueDetailsPage = () => {
    const [queueDetails, setQueueDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id: queueId } = useParams(); // Get the queue ID from the URL

    useEffect(() => {
        const loadQueueDetails = async () => {
            setLoading(true);
            try {
                const data = await getQueueDetails(queueId);
                setQueueDetails(data);
            } catch (err) {
                setError("Failed to load queue details.");
            }
            setLoading(false);
        };

        loadQueueDetails();
    }, [queueId]);

    const renderContent = () => {
        if (loading) {
            return <CircularProgress />;
        }
        if (error) {
            return <Typography color="error">{error}</Typography>;
        }
        if (!queueDetails) {
            return <Typography>No details found.</Typography>;
        }
        return (
            <Box>
                <List>
                    {queueDetails.waitingTokens.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="No users are currently waiting in this queue." />
                        </ListItem>
                    ) : (
                        queueDetails.waitingTokens.map(token => (
                            <ListItem key={token.tokenNumber}>
                                <ListItemText 
                                    primary={`Token #${token.tokenNumber}`}
                                    secondary={token.userName}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
        );
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Queue: {queueDetails ? queueDetails.queueName : 'Loading...'}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Currently Waiting
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {renderContent()}
            </Paper>
        </Container>
    );
};

export default QueueDetailsPage;