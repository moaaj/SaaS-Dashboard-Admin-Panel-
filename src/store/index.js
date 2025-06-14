import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import { auditLogsReducer } from '../services/auditLogService';
import websocketReducer from '../services/websocketService';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    auditLogs: auditLogsReducer,
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 