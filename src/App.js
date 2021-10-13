import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';
import Routes from './routers';
import FooterPages from './Components/Footer';
import { ToastContainer } from 'react-toastify'


const {Content } = Layout;

function App() {
  return (
 <Layout>
    <Content>
      <Routes/>
      <ToastContainer autoClose={3000}/>
    </Content>
    <FooterPages/>
  </Layout>
);
}

export default App;
