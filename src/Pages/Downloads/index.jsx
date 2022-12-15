import React, { useState, useEffect } from 'react'
import firebase from '../../Services/firebaseConnection'
import { Card, Button, Row, Col, Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './downloads.css'
import HeaderPages from '../../Components/Headers';
// import FooterPages from '../../Components/Footer'
import { toast } from 'react-toastify';

export default function Downloads() {

    return(
        <div>
            <HeaderPages />
        
        <div className='conteiner-home'>
            Downloads
        </div>
        </div>
    )
}
