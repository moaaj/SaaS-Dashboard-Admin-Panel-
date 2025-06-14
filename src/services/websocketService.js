import { createSlice } from '@reduxjs/toolkit';

// WebSocket connection state
let ws = null;
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

// Mock data generator for development
const generateMockAuditLog = () => {
  const actions = ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE'];
  const users = ['admin@example.com', 'editor@example.com', 'user@example.com', 'manager@example.com'];
  const details = [
    'User logged in successfully',
    'User logged out',
    'Created new user account',
    'Updated user profile',
    'Deleted user account',
    'Modified system settings',
    'Changed user permissions',
    'Updated content',
    'Deleted content',
    'Created new post',
  ];
  const userAgents = [
    'Chrome/Windows',
    'Firefox/MacOS',
    'Safari/iOS',
    'Edge/Windows',
    'Opera/Linux',
  ];

  return {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    details: details[Math.floor(Math.random() * details.length)],
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
  };
};

// WebSocket service methods
const websocketService = {
  connect: () => {
    if (import.meta.env.DEV) {
      console.log('Using mock WebSocket service');
      isConnected = true;
      return;
    }

    try {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        isConnected = true;
        reconnectAttempts = 0;
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        isConnected = false;
        
        // Attempt to reconnect
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          setTimeout(() => {
            reconnectAttempts++;
            websocketService.connect();
          }, RECONNECT_DELAY);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
    }
  },

  disconnect: () => {
    if (ws) {
      ws.close();
      ws = null;
      isConnected = false;
    }
  },

  send: (message) => {
    if (!isConnected) {
      console.warn('WebSocket is not connected');
      return;
    }

    if (import.meta.env.DEV) {
      console.log('Mock WebSocket message:', message);
      return;
    }

    try {
      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
  },

  subscribe: (channel, callback) => {
    if (import.meta.env.DEV) {
      // In development, simulate WebSocket messages
      const interval = setInterval(() => {
        const mockLog = generateMockAuditLog();
        callback({ type: 'AUDIT_LOG', payload: mockLog });
      }, 5000);

      // Store the interval ID for cleanup
      websocketService._mockIntervals = websocketService._mockIntervals || {};
      websocketService._mockIntervals[channel] = interval;
      return;
    }

    if (!ws) {
      console.warn('WebSocket is not connected');
      return;
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.channel === channel) {
          callback(data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  },

  unsubscribe: (channel) => {
    if (import.meta.env.DEV) {
      // Clear the mock interval
      if (websocketService._mockIntervals && websocketService._mockIntervals[channel]) {
        clearInterval(websocketService._mockIntervals[channel]);
        delete websocketService._mockIntervals[channel];
      }
      return;
    }

    if (!ws) {
      return;
    }

    // Remove the message handler for this channel
    ws.onmessage = null;
  },
};

// WebSocket slice
const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    isConnected: false,
    error: null,
    lastMessage: null,
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLastMessage: (state, action) => {
      state.lastMessage = action.payload;
    },
  },
});

export const { setConnectionStatus, setError, setLastMessage } = websocketSlice.actions;
export default websocketService;
export const websocketReducer = websocketSlice.reducer; 