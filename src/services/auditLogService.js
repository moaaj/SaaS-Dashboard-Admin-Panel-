import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  logs: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
  realTimeUpdates: false,
};

// Generate mock audit logs
const generateMockLogs = (count = 111) => {
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

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    details: details[Math.floor(Math.random() * details.length)],
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
  }));
};

const mockAuditLogs = generateMockLogs();

// Async thunks
export const fetchAuditLogs = createAsyncThunk(
  'auditLogs/fetchLogs',
  async ({ page = 1, limit = 10, filters = {} }) => {
    // In development, use mock data
    if (import.meta.env.DEV) {
      const mockLogs = generateMockLogs(111);
      const filteredLogs = filterLogs(mockLogs, filters);
      const paginatedLogs = paginateLogs(filteredLogs, page, limit);
      
      return {
        logs: paginatedLogs,
        total: filteredLogs.length,
        page,
        limit,
      };
    }

    // In production, make API call
    try {
      const response = await fetch(`/api/audit-logs?page=${page}&limit=${limit}&${new URLSearchParams(filters)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Helper function to filter logs
const filterLogs = (logs, filters) => {
  return logs.filter(log => {
    if (filters.action && log.action !== filters.action) return false;
    if (filters.user && !log.user.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
    return true;
  });
};

// Helper function to paginate logs
const paginateLogs = (logs, page, limit) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return logs.slice(start, end);
};

export const createAuditLog = createAsyncThunk(
  'auditLogs/createAuditLog',
  async (logData) => {
    if (import.meta.env.DEV) {
      console.log('Creating audit log:', logData);
      return {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...logData,
      };
    }

    const response = await axios.post('/api/audit-logs', logData);
    return response.data;
  }
);

// Slice
const auditLogsSlice = createSlice({
  name: 'auditLogs',
  initialState,
  reducers: {
    toggleRealTimeUpdates: (state) => {
      state.realTimeUpdates = !state.realTimeUpdates;
    },
    addLog: (state, action) => {
      state.logs.unshift(action.payload);
      state.total += 1;
    },
    clearLogs: (state) => {
      state.logs = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.logs;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAuditLog.fulfilled, (state, action) => {
        if (state.realTimeUpdates) {
          state.logs.unshift(action.payload);
          state.total += 1;
        }
      });
  },
});

export const { toggleRealTimeUpdates, addLog, clearLogs } = auditLogsSlice.actions;
export const auditLogsReducer = auditLogsSlice.reducer;
export default auditLogsReducer; 