import React, { useState, useEffect } from 'react'
import firebase from '../../Services/firebaseConnection'
import { Card, Button, Row, Col, Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './downloads.css'
import HeaderPages from '../../Components/Headers';
// import FooterPages from '../../Components/Footer'
import { toast } from 'react-toastify';





export default function Downloads() {

    return (
        <div>
            <HeaderPages />

            <div className='conteiner-home'>
                <div className='div-download'>
                    <ul>
                        <li>
                            <a href='https://drive.google.com/file/d/1HJRWy1dDeDbVl6cCL5BIvtsUKLoQXeef/view?usp=share_link' target='_blank'>
                                PANFLETO</a>
                        </li>
                        <li>
                            <a href='https://docs.google.com/document/d/1skkLJPomu2sneA6zNFh2suSHJlOeht20/edit?usp=share_link&ouid=105343071282597879340&rtpof=true&sd=true' target='_blank'>
                                PAPEL TIMBRADO</a>
                        </li>
                        <li>
                            <a href='https://drive.google.com/file/d/1HJRWy1dDeDbVl6cCL5BIvtsUKLoQXeef/view?usp=share_link' target='_blank'>
                                PANFLETO</a>
                        </li>
                    </ul>

                </div>

            </div>
        </div>
    )
}
