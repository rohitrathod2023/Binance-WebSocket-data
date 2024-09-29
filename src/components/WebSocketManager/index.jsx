import React, { useEffect, useRef } from "react";

const WebSocketManager = ({ symbol, interval, onData }) => {
  const ws = useRef(null);

  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onData(data);
    };

    return () => {
      ws.current.close();
    };
  }, [symbol, interval]);

  return null;
};

export default WebSocketManager;
