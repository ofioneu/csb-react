import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout } from "antd";
import Routes from "./Routes";
import FooterPages from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import HeaderPages from "./Components/Headers";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <HeaderPages/>
        <Routes />
        <Content>
          <ToastContainer autoClose={3000} />
        </Content>
        <FooterPages />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
