import React, { useContext } from "react";
import "antd/dist/antd.css";
import { Row, Col, Spin, Menu } from "antd";
import { Link } from "react-router-dom";
import "./header.css";
import { MoedaContext } from "../../Contexts/moeda";
import logoMenu from "../../assets/logoMenu.png";

export default function HeaderPages() {
  const { moeda } = useContext(MoedaContext);

  return (
    <div>
      <Row className="row-menu">
        <Col span={1}>
          <Link className="logo-item" to="/home">
            <img id="logo" src={logoMenu} alt="Logo" />
          </Link>
        </Col>
        <Col span={15} className="col-menu-2">
          <Menu theme="dark" mode="horizontal" className="menu">
            <Menu.Item className="menu-item" key="1" title="Home">
              <Link className="link-menu" to="/home">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="2">
              <Link className="link-menu" to="/calculadoras">
                Calculadoras
              </Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="3">
              <Link className="link-menu" to="/partsTable">
                Tabela Peças
              </Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="4">
              <Link className="link-menu" to="/importacao">
                Importacoes
              </Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="5">
              <Link className="link-menu" to="/ean">
                EAN
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          {moeda.ask && (
            <div className="moeda">{`${moeda.name}: R$ ${moeda.ask}`}</div>
          )}

          {!moeda.ask && (
            <div className="moeda">
              <Spin className="customSpin" size="large" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
