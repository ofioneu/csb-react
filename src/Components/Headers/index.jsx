import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'
import './header.css'
import api from '../../Services/api'

const HeaderPages = () => {

  const [moeda, setMoeda] = useState([])

  useEffect(()=>{

    async function loadMoeda(){
      const response = await api.get('last/BTC-BRL')
      setMoeda(response.data.BTCBRL);
      
  }
  loadMoeda();
  },[moeda])

  // async function loadMoedaUpdate(){
  //   const response = await api.get('last/BTC-BRL')
  //     setMoeda(response.data.BTCBRL);
  // }

  // // setInterval(()=>{    
  // //   return loadMoedaUpdate()      
  // // },30*1000)


    return( 
      <div className = 'row'>
        <Row>
        <Col span={2}>
        <div className = 'logo'>
          <Link className='logo-item' to='/'>
            <h1>CSB</h1>
          </Link>

        </div>

        </Col>
        <Col span={15}>
          <Menu theme='dark' mode="horizontal" className = 'menu'>
            <Menu.Item className = 'menu-item' key="1" title='Home'>
              <Link className='link-menu' to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item className = 'menu-item' key="2">
              <Link to='/frete'>Frete</Link>
            </Menu.Item>
            <Menu.Item className = 'menu-item' key="3">
              <Link to='/comissao'>Comissão</Link>
            </Menu.Item>            
          </Menu>          
        </Col>
        <Col span={7}>
          <div className='moeda'>
              {`${moeda.name}: R$ ${moeda.ask}`}
          </div>
        
        </Col>
        </Row>
        
      </div>   
 
    )
}

export default HeaderPages