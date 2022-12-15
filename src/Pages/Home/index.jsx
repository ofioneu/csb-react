import React, { useState, useEffect } from 'react'
import firebase from '../../Services/firebaseConnection'
import { Card, Button, Row, Col, Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './home.css'
import HeaderPages from '../../Components/Headers';
// import FooterPages from '../../Components/Footer'
import { toast } from 'react-toastify';

export default function Home() {

    const db = firebase.firestore();

    const [AllData, setAllData] = useState([])    

    useEffect(()=>{
        getAllData()
        
    },[])

    async function getAllData(){
        const getData = await db.collection('cardsHome')
        getData.get().then((snapshot)=>{
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
                <Row>
                    <Col span={12} id='col-1'>
                        <div className="site-card-border-less-wrapper">
                            <li>
                            <Card className='card' title="Dados Bancarios Peças" bordered={true}
                                actions={[<Button onClick={()=>copy('text-dbpecas')} icon={<CopyOutlined />} ></Button>]}>
                                
                                {
                                AllData[0] && (                             
                                    <ul id='text-dbpecas'>
                                    <li>{AllData[1].banco}</li>
                                    <li>Agencia: {AllData[1].agencia}</li>
                                    <li>Conta corrente: {AllData[1].cc}</li>
                                    <li>CNPJ: {AllData[1].cnpj}</li>
                                    <li>Nome: {AllData[1].nome}</li>
                                    <li>PIX: {AllData[1].pix}</li>
                                    <li>Site: {AllData[1].site}</li>
                                </ul> )}

                                {!AllData[0] && (
                                    <div>
                                    <Spin />
                                    </div>
                                )}

                            </Card>
                            <Card className='card' title="Dados Bancarios Serviços"
                                bordered={true}
                                actions={[<Button onClick={()=>copy('text-dbservico')} icon={<CopyOutlined />} ></Button>]}
                            >

                            {
                                AllData[0] && (                             
                                    <ul id='text-dbservico'>
                                    <li>{AllData[0].banco}</li>
                                    <li>Agencia: {AllData[0].agencia}</li>
                                    <li>Conta corrente: {AllData[1].cc}</li>
                                    <li>CNPJ: {AllData[0].cnpj}</li>
                                    <li>Nome: {AllData[0].nome}</li>
                                    <li>PIX: {AllData[0].pix}</li>
                                    <li>Site: {AllData[0].site}</li>
                                </ul> )}

                                {!AllData[0] && (
                                    <div>
                                    <Spin />
                                    </div>
                                )}

                            </Card>
                            <Card className='card' title="Endereços"
                                actions={[<Button onClick={()=>copy('text-endereco')} icon={<CopyOutlined />} ></Button>]}
                                bordered={true}
                            >   
                                {/* falta add os endereços de manaus */}
                                {AllData[2] &&(
                                    <ul id='text-endereco'>
                                    <li>Escritório SP: {AllData[2].adressEscritorio} </li>
                                    <li>CEP Escritório SP: {AllData[2].cepEscritorio} </li>
                                    <li>Chiller SP: {AllData[2].adressChiller} </li>
                                    <li>Escritório AM: {AllData[2].adressEscritorioAm} </li>
                                    <li>CEP Escritório AM: {AllData[2].cepEscritorioAm} </li>
                                    <li>Chiller AM: {AllData[2].adressChillerAm} </li>
                                    <li>CEP Chiller AM: {AllData[2].cepChillerAm} </li>
                                    </ul>
                                )}
                                {!AllData[0] && (
                                    <div>
                                    <Spin />
                                    </div>
                                )}
                                           
                            </Card>
                            <Card className='card' title="Dados juridicos"
                                actions={[<Button onClick={()=>copy('text-juridico')} icon={<CopyOutlined />} ></Button>]}>
                                bordered={true}
                                
                                {AllData[2] &&(
                                <ul id='text-juridico'>
                                    <li>CNPJ CSB SP: {AllData[3].cnpjChiller}</li>
                                    <li>IE CSB SP: {AllData[3].ieChiller}</li>
                                    <li>IM CSB SP: {AllData[3].imChiller}</li>
                                    <li>RG Leandro: {AllData[3].rgLeandro}</li>
                                    <li>CPF Leandro: {AllData[3].cpfLeandro}</li>
                                    <li>Nº Conta DHL: {AllData[3].dhl}</li>
                                    <li>Fabio Martins: {AllData[3].cnpjFabio}</li>
                                    <li>CNPJ Manaus: {AllData[3].cnpjChillerAm} </li>
                                    <li>IE Manaus:{AllData[3].ieChillerAm} </li>
                                    <li>IM Manaus: {AllData[3].imChillerAm} </li>
                                    <li>CPF Ricardo: {AllData[3].cpfRicardo}</li>
                                    <li>RG Ricardo:{AllData[3].rgRicardo}</li>
                                </ul>
                                )}
                                    {!AllData[0] && (
                                    <div>
                                    <Spin />
                                    </div>
                                )}

                            </Card>
                            <Card className='card' title="Frase Serviço"
                                actions={[<Button onClick={()=>copy('text-servico')} icon={<CopyOutlined />} ></Button>]}
                                bordered={true}
                            >
                                <p id='text-servico'>TRABALHO REALIZADO POR UM ENGENHEIRO MECANICO ESPECIALIZADO EM MANUTENÇÃO <br></br> E TREINAMENTOS
                                    EM EQUIPAMENTOS DAS MARCAS CARRIER , TRAINE E YORK.CREA: 5063881498</p>
                            </Card>
                            </li>
                        </div>
                    </Col>

                    <Col span={12} id='col-2'>
                        <div className="site-card-border-less-wrapper">

                            <li>

                            <Card className='card' title='Forncedores'>
                                <Button type='link' href='https://www.chillerpecas.com.br/' target='_blank' >Chiller Peças</Button>
                                <Button type='link' href='https://siberianopecas.com.br/' target='_blank'>Siberiano</Button>
                                <Button type='link' href='https://qualipecas.com.br/' target='_blank'>Qualipeças</Button>
                            </Card>

                            <Card className='card' title='DHL'>
                                <Button type='link' href='https://mydhl.express.dhl/br/pt/auth/login.html' target='_blank' >DHL EXPRESS</Button>
                                <Button type='link' href='https://mybill.dhl.com/login/?next=/dashboard/' target='_blank'>MYBILL</Button>
                            </Card>

                            <Card className='card' title='FISCAL'>
                                <Button type='link' href='http://www.sintegra.gov.br/' target='_blank' >SINTEGRA</Button>
                                <Button type='link' href='https://hortolandia.ginfes.com.br/' target='_blank'>NF-e SERVIÇO</Button>
                                <Button type='link' href='https://www.leitorxml.com/#' target='_blank'>XML READER</Button>
                            </Card>

                            <Card className='card' title='Email'>
                                <Button type='link' href='https://webmail1.hostinger.com.br/?_task=logout&_token=L2I6DvEPB1GsgQ2gQhMMOINrmKZKbiGJ' target='_blank' >EMAIL</Button>
                            </Card>
                            <Card className='card' title='Duratex'>
                                <Button type='link' href='http://dexco.levelgestao.com.br/MinhaConta/Logon.aspx?ReturnUrl=%2fControleTerceiros%2fAnaliseDocumentosCadastraisTerceiro.aspx' target='_blank' >Gestão Fornecedores</Button>
                                <Button type='link' href='https://jira.duratex.com.br/login.jsp' target='_blank' >Jira</Button>
                            </Card>
                            <Card className='card' title='AGIR'>
                                <Button type='link' href='https://ecompras.agirsaude.org.br/v/Default.aspx?parms=52F72D3798851D747BD5FCC6A1916D19F41E2C5748B2836D160BF3630131992B' target='_blank' >Compras</Button>
                            </Card>
                            </li>
                        </div>
                    </Col>

                </Row>
                
            </div>
            
        </div>
    )}
