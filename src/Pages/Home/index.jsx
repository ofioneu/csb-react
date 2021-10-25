import React from 'react'
import { Card, Button, Row, Col, Space } from 'antd';
import './home.css'


export default function Home(){

    return(
            <Row>
                <Col span={12}>
            <div className="site-card-border-less-wrapper">
                <Card className = 'card' title="Dados Bancarios Serviços" bordered={true}>
                    <p>Dados Bancários: Banco do Brasil </p>
                    <p>Agencia: 2324-8</p>
                    <p>Conta corrente: 34.585-7</p>
                    <p>CNPJ: 36.196.281/0001-47 </p>
                    <p>Nome: Chiller Service Brasil</p>
                    <p>CHAVE PIX: 19992171858</p>
                </Card>
                <Card className = 'card' title="Dados Bancarios Peças" bordered={true}>
                    <p>Dados Bancários:Santander</p>
                    <p>Agencia: 2045 </p>
                    <p>Conta corrente: 130040056</p>
                    <p>CNPJ: 36.196.281/0001-47 </p>
                    <p>Nome: Chiller Service Brasil</p>
                    <p>CHAVE PIX(CNPJ): 36196281000147</p>
                </Card>
                <Card className = 'card' title="Endereços" bordered={true}>
                    <p>Escrtório: Rua Anjelica, 1318, Jd. São Sebastião, Hortolandia -SP</p>
                    <p>Empresa: RUA PAULA FRANCINE PALHOTO DA SILVA, 67 - JARDIM DAS FIGUEIRAS I, HORTOLANDIA - SP</p>
                </Card>
                <Card className = 'card' title="Dados juridicos" bordered={true}>
                    <p>Chiller Service Brasil: 36.196.281/0001-47</p>
                    <p>Chiller Service Brasil (IE): 748323108117</p>
                    <p>Chiller Service Brasil (IM): 129303</p>
                    <p>RG LEandro: 29611019x</p>
                    <p>CPF LEandro: 300.109.358-78</p>
                    <p>Nº Conta DHL: 964602119</p>
                    <p>Fabio Martins: 42.530.817/0001-11</p>
                </Card>
                <Card className = 'card' title="Frase Serviço" bordered={true}>
                    <p>TRABALHO REALIZADO POR UM ENGENHEIRO MECANICO ESPECIALIZADO EM MANUTENÇÃO E TREINAMENTOS
                        EM EQUIPAMENTOS DAS MARCAS CARRIER , TRAINE E YORK.CREA: 5063881498</p>
                </Card>
                
            </div>
            </Col>
            
            <Col span={12}>
            <Space  direction="vertical">
            <Card className='card' title='Forncedores'>
            <Button type='link'  href='https://www.chillerpecas.com.br/' target='_blank' >Chiller Peças</Button>
            <Button type='link' href='https://siberianopecas.com.br/' target='_blank'>Siberiano</Button>
            <Button type='link' href='https://qualipecas.com.br/' target='_blank'>Qualipeças</Button>
            </Card>
            </Space>
            <Space  direction="vertical">
            <Card className='card' title='DHL'>
            <Button type='link'  href='https://mydhl.express.dhl/br/pt/auth/login.html' target='_blank' >DHL EXPRESS</Button>
            <Button type='link' href='https://mybill.dhl.com/login/?next=/dashboard/' target='_blank'>MYBILL</Button>
            </Card>
            </Space>
            <Space  direction="vertical">
            <Card className='card' title='FISCAL'>
            <Button type='link'  href='http://www.sintegra.gov.br/' target='_blank' >SINTEGRA</Button>
            <Button type='link' href='https://hortolandia.ginfes.com.br/' target='_blank'>NF-e SERVIÇO</Button>
            <Button type='link' href='https://www.leitorxml.com/#' target='_blank'>XML READER</Button>
            </Card>
            </Space>
            <Space  direction="vertical">
            <Card className='card' title='Email'>
            <Button type='link'  href='https://webmail1.hostinger.com.br/?_task=logout&_token=L2I6DvEPB1GsgQ2gQhMMOINrmKZKbiGJ' target='_blank' >EMAIL</Button>
            </Card>
            </Space>
            </Col>
            
            </Row> 
        
    )    
}