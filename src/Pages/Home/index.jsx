import React from 'react'
import { Card, Button, Row, Col } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import './home.css'
import HeaderPages from '../../Components/Headers';
// import FooterPages from '../../Components/Footer'
import { toast } from 'react-toastify';

export default function Home() {

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
                            <Card className='card' title="Dados Bancarios Peças" bordered={true}
                                actions={[<Button onClick={()=>copy('text-dbpecas')} icon={<CopyOutlined />} ></Button>]}
                        >
                                <ul id='text-dbpecas'>
                                    <li>Santander</li>
                                    <li>Agencia: 2045 </li>
                                    <li>Conta corrente: 130040056</li>
                                    <li>CNPJ: 36.196.281/0001-47 </li>
                                    <li>Nome: Chiller Service Brasil</li>
                                    <li>CHAVE PIX(CNPJ): 36196281000147</li>
                                    <li> WWW.CHILLERSERVICEBRASIL.COM.BR</li>
                                </ul>

                            </Card>
                            <Card className='card' title="Dados Bancarios Serviços"
                                bordered={true}
                                actions={[<Button onClick={()=>copy('text-dbservico')} icon={<CopyOutlined />} ></Button>]}
                            >
                                <ul id='text-dbservico'>
                                    <li>Banco do Brasil</li>
                                    <li>Agencia: 2324-8</li>
                                    <li>Conta corrente: 34.585-7</li>
                                    <li>CNPJ: 36.196.281/0001-47</li>
                                    <li>Nome: Chiller Service Brasil</li>
                                    <li>CHAVE PIX: 19992171858</li>
                                    <li>WWW.CHILLERSERVICEBRASIL.COM.BR</li>
                                </ul>

                            </Card>
                            <Card className='card' title="Endereços"
                                actions={[<Button onClick={()=>copy('text-endereco')} icon={<CopyOutlined />} ></Button>]}
                                bordered={true}
                            >
                                <ul id='text-endereco'>
                                    <li>Escrtório: Rua Angelica, 1318, Jd. São Sebastião, Hortolandia -SP</li>
                                    <li>Empresa: RUA PAULA FRANCINE PALHOTO DA SILVA, 67 <br></br> - JARDIM DAS FIGUEIRAS I, HORTOLANDIA - SP</li>
                                </ul>
                            </Card>
                            <Card className='card' title="Dados juridicos"
                                actions={[<Button onClick={()=>copy('text-juridico')} icon={<CopyOutlined />} ></Button>]}
                                bordered={true}
                            >
                                <ul id='text-juridico'>
                                    <li>Chiller Service Brasil: 36.196.281/0001-47</li>
                                    <li>Chiller Service Brasil (IE): 748323108117</li>
                                    <li>Chiller Service Brasil (IM): 129303</li>
                                    <li>RG Leandro: 29611019x</li>
                                    <li>CPF Leandro: 300.109.358-78</li>
                                    <li>Nº Conta DHL: 964602119</li>
                                    <li>Fabio Martins: 42.530.817/0001-11</li>
                                    <li>Arthur Ferreira: 47.116.459/0001-19</li>
                                </ul>
                            </Card>
                            <Card className='card' title="Frase Serviço"
                                actions={[<Button onClick={()=>copy('text-servico')} icon={<CopyOutlined />} ></Button>]}
                                bordered={true}
                            >
                                <p id='text-servico'>TRABALHO REALIZADO POR UM ENGENHEIRO MECANICO ESPECIALIZADO EM MANUTENÇÃO <br></br> E TREINAMENTOS
                                    EM EQUIPAMENTOS DAS MARCAS CARRIER , TRAINE E YORK.CREA: 5063881498</p>
                            </Card>

                        </div>
                    </Col>

                    <Col span={12} id='col-2'>
                        <div className="site-card-border-less-wrapper">

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
                        </div>
                    </Col>

                </Row>
                
            </div>
            
        </div>
    )
}