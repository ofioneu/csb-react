import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Spin } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import './header.css'
import { MoedaContext } from '../../Contexts/moeda';




export default function HeaderPages() {

  const { moeda } = useContext(MoedaContext)

  return (

    <div className='row-menu'>
      <Row>
        <Col span={2}>
          <div className='logo'>
            <Link className='logo-item' to='/home'>
              <h1>CSB</h1>
            </Link>

          </div>

        </Col>
        <Col span={15}>
          <Menu theme='dark' mode="horizontal" className='menu'>
            <Menu.Item className='menu-item' key="1" title='Home'>
              <Link className='link-menu' to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item className='menu-item' key="2">
              <Link className='link-menu' to='/calculadoras'>Calculadoras</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={7}>
          {moeda.ask && (
            <div className='moeda'>
              {`${moeda.name}: R$ ${moeda.ask}`}
            </div>
          )}

          {!moeda.ask && (
            <div className='moeda'>
              <Spin />
            </div>
          )}

        </Col>
      </Row>

    </div>

  )
}
