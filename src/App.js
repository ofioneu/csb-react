import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import Routes from './routes';
import AuthProvider from './Contexts/auth';
import MoedaProvaider from './Contexts/moeda';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <AuthProvider>
      <MoedaProvaider>
      <BrowserRouter>
      <ToastContainer position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        <Routes />        
      </BrowserRouter>
      </MoedaProvaider>
    </AuthProvider>



  );
}

export default App;
