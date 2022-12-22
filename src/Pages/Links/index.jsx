import React, { useState, useEffect } from 'react'
import firebase from '../../Services/firebaseConnection'
import { Row, Col, Spin } from 'antd';
import './links.css'
import HeaderPages from '../../Components/Headers';
import { toast } from 'react-toastify';

export default function Links() {

    const db = firebase.firestore();

    const [AllData, setAllData] = useState([])

    useEffect(() => {
        getAllData()

    }, [])

    async function getAllData() {
        const getData = await db.collection('cardsHome')
        getData.get().then((snapshot) => {
            if (snapshot.empty) {
                toast.error("No matching documents.");
                return;
            }

            const dataDoc = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            setAllData(dataDoc)

        });

    }



    function copy(idKey) {
        let textoCopiado = document.getElementById(idKey).innerText;
        navigator.clipboard.writeText(textoCopiado)
            .then(() => {
                toast.success("Texto copiado!")
            })
            .catch(err => {
                toast.error("Error")
                console.log('Error ao copiar: ' + err)
            })
    }




    return (

        <div>
            <HeaderPages />
            <div id='conteiner-home'>
                <div className="cards">

                    <Row span={20}>
                        <Col className="col-links" span={12}>
                            <h1>PORTAIS CLIENTES</h1>
                            {
                                AllData[0] && (
                                    <ul id='text-dbpecas'>
                                        <li><a href={AllData[7].agir} target='_blank'>AGIR</a></li>
                                        <li><a href={AllData[7].duratexFornecedores} target='_blank'>DURATEX FORNECEDORES</a></li>
                                        <li><a href={AllData[7].duratexJira} target='_blank'>DURATEX JIRA</a></li>

                                    </ul>)}

                            {!AllData[0] && (
                                <div>
                                    <Spin />
                                </div>
                            )}
                        </Col>

                        <Col className='col-links' span={12}>
                            <h1>LOSGISTICA</h1>
                            {
                                AllData[0] && (
                            <ul>
                            <a type='link' href={AllData[7].dhlExpress} target='_blank' >DHL EXPRESS</a>
                            <a type='link' href={AllData[7].dhlMyBill} target='_blank'>MYBILL</a>
                            <a type='link' href={AllData[7].correiosServicosOnline} target='_blank'>CORREIOS SERVIÇOS ONLINE</a>
                            <a type='link' href={AllData[7].correiosEmpresas} target='_blank'>CORREIOS EMPRESAS</a>
                            </ul>
                            )}

                            {!AllData[0] && (
                                <div>
                                    <Spin />
                                </div>
                            )}

                        </Col>
                        <Col span={12}>
                            <h1>FISCAL</h1>
                            {
                                AllData[0] && (
                            <ul>
                            <a type='link' href={AllData[7].sitegra} target='_blank' >SINTEGRA</a>
                            <a type='link' href={AllData[7].ginfes} target='_blank'>NF-e SERVIÇO</a>
                            <a type='link' href={AllData[7].xmlReader} target='_blank'>XML READER</a>
                            </ul>
                            )}

                            {!AllData[0] && (
                                <div>
                                    <Spin />
                                </div>
                            )}

                        </Col>
                        <Col span={12}>
                            <h1>EMAILS</h1>
                            {
                                AllData[0] && (
                            <ul>

                            <a type='link' href={AllData[7].email} target='_blank' >EMAIL</a>

                            </ul>
                            )}

                            {!AllData[0] && (
                                <div>
                                    <Spin />
                                </div>
                            )}

                        </Col>


                    </Row>
                </div>

            </div>

        </div>
    )
}
