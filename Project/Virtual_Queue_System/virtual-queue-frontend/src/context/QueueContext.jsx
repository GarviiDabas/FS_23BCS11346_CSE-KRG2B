import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext'; 
// FIX: Import from the correct 'api.js' file
import { getActiveQueues, joinQueue, getMyTokenStatus } from '../services/api';

const QueueContext = createContext(null);

const initialState = {
  queues: [],
  activeToken: null,
  status: 'idle', 
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUEUES':
      return { ...state, queues: action.payload };
    case 'SET_TOKEN':
      return { ...state, activeToken: action.payload, status: 'success', error: null };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, status: 'error' };
    default:
      return state;
  }
}

export function QueueProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth(); // Get the user object

  // Fetch initial queues
  useEffect(() => {
    const fetchInitialQueues = async () => {
      try {
        dispatch({ type: 'SET_STATUS', payload: 'loading' });
        const queues = await getActiveQueues();
        dispatch({ type: 'SET_QUEUES', payload: queues });
        dispatch({ type: 'SET_STATUS', payload: 'idle' });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load queues.' });
      }
    };
    fetchInitialQueues();
  }, []);

  // --- Actions ---
  const joinQueueAction = useCallback(async (queueId) => {
    if (!user || !user.id) {
      const err = new Error('You must be logged in to join.');
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    }
    try {
      dispatch({ type: 'SET_STATUS', payload: 'loading' });
      // Call the correct 'joinQueue' function with 'user.id'
      const token = await joinQueue(queueId, user.id); 
      dispatch({ type: 'SET_TOKEN', payload: token });
      return token;
    } catch (err) {
      const errorMessage = err.response?.data || 'Failed to join the queue.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  }, [user]);

  const fetchTokenStatusAction = useCallback(async (tokenId) => {
    try {
      const token = await getMyTokenStatus(tokenId);
      dispatch({ type: 'SET_TOKEN', payload: token });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch token status.';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  const contextValue = {
    ...state,
    joinQueue: joinQueueAction,
    fetchTokenStatus: fetchTokenStatusAction,
  };

  return (
    <QueueContext.Provider value={contextValue}>
      {children}
    </QueueContext.Provider>
  );
}

export const useQueue = () => useContext(QueueContext);