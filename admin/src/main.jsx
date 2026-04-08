import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AdminProvider from './context/AdminContext.jsx'; // Chuẩn bài, không cần {}

ReactDOM.createRoot(document.getElementById('root')).render(
  // Tạm thời tắt React.StrictMode để useEffect không bị gọi 2 lần lặp lại
  <BrowserRouter>
    <AdminProvider>
      <App />
    </AdminProvider>
  </BrowserRouter>
);