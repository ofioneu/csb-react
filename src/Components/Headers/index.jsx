import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom'
import { useHistory, NavLink } from "react-router-dom";

import './header.css'
import { MoedaContext } from '../../Contexts/moeda';




export default function HeaderPages() {

  const { moeda } = useContext(MoedaContext)

  function changeColorMenuItem(e) {
    const menuItem = e.target.getAttribute('a-key')
    menuItem.style.backgroundColor = '#7E7C7C'

  }
  const currentRoute = useHistory().location.pathname.toLowerCase();
  return (

    <div className='row-menu'>
      <Row>
        <Col span={2}>
          <div className='logo'>
            <Link className='logo-item' to='/home'>
              CSB
            </Link>
          </div>

        </Col>
        <Col span={15}>

          <div className='tab-bar'>
            
            <Link className={currentRoute.includes("sp") ? "tab active" : "tab"} active to='/sp'>São Paulo</Link>
            <Link className={currentRoute.includes("am") ? "tab active" : "tab"} active to='/am'>Manaus</Link>
            <Link className={currentRoute.includes("home") ? "tab active" : "tab"} active to='/home'>Links</Link>
            <Link className={currentRoute.includes("downloads") ? "tab active" : "tab"} active to='/downloads'>Downloads</Link>
            <Link className={currentRoute.includes("calculadoras") ? "tab active" : "tab"} active to='/calculadoras'>Calculadoras</Link>   
          </div>
        </Col>
        <Col span={7}>
          {moeda.ask && (
            <div className='moeda'>
              {`Dollar: R$ ${moeda.ask}`}
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
