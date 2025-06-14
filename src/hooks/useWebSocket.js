import { useEffect, useCallback } from 'react';
import websocketService from '../services/websocketService';

export const useWebSocket = (channel = 'default', onMessage) => {
  const handleMessage = useCallback((data) => {
    if (onMessage) {
      onMessage(data);
    }
  }, [onMessage]);

  useEffect(() => {
    // Connect to WebSocket when the component mounts
    websocketService.connect();

    // Subscribe to the specified channel
    websocketService.subscribe(channel, handleMessage);

    // Cleanup when the component unmounts
    return () => {
      websocketService.unsubscribe(channel);
      websocketService.disconnect();
    };
  }, [channel, handleMessage]);

  // Return methods that can be used by the component
  return {
    send: (message) => websocketService.send(message),
    isConnected: websocketService.isConnected,
  };
}; 