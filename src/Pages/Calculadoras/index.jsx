import React, { useState, useEffect } from 'react'
import firebase from '../../Services/firebaseConnection'
import { InputNumber, Form, Button, Row, Col, Card, Modal } from 'antd'
import { SettingFilled } from '@ant-design/icons';
import './calculadoras.css'
import HeaderPages from '../../Components/Headers';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Table } from 'antd';

export default function Calculadora() {

  // const { moeda } = useContext(MoedaContext)
  const [precoReal, setPrecoReal] = useState()
  const [precoInvoice, setPrecoInvoice] = useState()
  const [frete, setFrete] = useState()
  const [venda, setVenda] = useState(0)
  const [compra, setCompra] = useState(0)
  const [showModalSetTax, setShowModalSetTax] = useState(false)
  const [configTaxBd, setConfigTaxBd] = useState([]);

  // Hook Obj resultados dos calculos
  const [custosImportacao, setCustosImportacao] = useState({})

  // Hook array de obj que serão passados para o campo dataSource do Ant Table
  const [dataSource, setDataSource] = useState([])

  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };


  const db = firebase.firestore();



  // carrega as taxas do banco de dados
  useEffect(() => {
    async function getTax() {
      const taxa = await db.collection("tax");
      taxa.get().then((snapshot) => {
        if (snapshot.empty) {
          toast.error("No matching documents.");
          return;
        }

        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            aliquota: doc.data().aliquota,
            importTax: doc.data().importTax,
            icms: doc.data().icms,
            iof: doc.data().iof,
            dhl: doc.data().dhl,
            alibaba: doc.data().alibaba
          });
        });

        setConfigTaxBd(lista);
      });
    }

    getTax();

  },[]);


  // atualiza as taxas no banco de dados
  async function configTax(fieldsValue) {
    await firebase
      .firestore()
      .collection("tax")
      .doc(configTaxBd[0].id)
      .update({
        aliquota: fieldsValue.aliquota,
        importTax: fieldsValue.importTax,
        icms: fieldsValue.icms,
        iof: fieldsValue.iof,
        alibaba: fieldsValue.taxAlibaba,
        dhl: fieldsValue.taxDhl
      })
      .then(() => {
        toast.success("DADOS CADASTRADO COM SUCESSO!");
        setShowModalSetTax(false);
      })
      .catch((error) => {
        toast.error("GEROU ALGUM ERRO!");
      });
  }

  function calcular(precoReal, precoInvoice, freteUsd) {
    // colocar os dados de taxas no banco de dados
    const taxAlibaba = 0.0
    const taxaImportacao = 60.0
    const taxaIof = 1.1
    const taxaIcms = 18.0
    const valorFixDhl = 106.26
    const moedaValue = 5.35 //moeda.ask

    // convertendo valores prod e ship em real
    const valorProdutoInvoiceBrl = precoInvoice * moedaValue
    const valorFreteBrl = freteUsd * moedaValue


    const valorProdutoInvoiceMaisFreteBrl = (valorProdutoInvoiceBrl + valorFreteBrl)

    const custoTaxaImportacao = (valorProdutoInvoiceMaisFreteBrl * (taxaImportacao / 100))

    const custoTaxaIof = (valorProdutoInvoiceMaisFreteBrl * (taxaIof / 100))

    const custoTaxaIcms = (((valorProdutoInvoiceMaisFreteBrl + custoTaxaImportacao) / (1 - (taxaIcms / 100))) * (taxaIcms / 100))

    const valorTotalTributos = (custoTaxaImportacao + custoTaxaIcms + custoTaxaIof + valorFixDhl)
    const valorTotalCompra = ((valorProdutoInvoiceMaisFreteBrl + valorTotalTributos))

    const valorTotalProduto = ((valorTotalCompra + (precoReal * moedaValue)))


    // Obj que será add no Hook custosImportacao []

    setCustosImportacao({
      'custoTaxImport': custoTaxaImportacao.toFixed(2),
      'custoTaxaIcms': custoTaxaIcms.toFixed(2),
      'custoTaxaIof': custoTaxaIof.toFixed(2),
      'valorTotalTributos': valorTotalTributos.toFixed(2),
      'valorTotalCompra': valorTotalCompra.toFixed(2),
      'valorTotalProduto': valorTotalProduto.toFixed(2),
      'taxAlibaba': taxAlibaba.toFixed(2)
    })


    //Metodo de inserir os novos resultados no Hook dataSource
    setDataSource(resultImport => [...resultImport, custosImportacao])



  }
  const respostaPorcentagemValor = (((venda - compra) / compra) * 100)



  const columns = [
    {
      title: 'CUST. TAXA IMPORT. (R$)',
      dataIndex: 'custoTaxImport',
      key: 'custoTaxImport',
    },
    {
      title: 'ICMS (R$)',
      dataIndex: 'custoTaxaIcms',
      key: 'icms',
    },
    {
      title: 'IOF (R$)',
      dataIndex: 'custoTaxaIof',
      key: 'iof',
    },
    {
      title: 'TOTAL IMPOSTOS (R$)',
      dataIndex: 'valorTotalTributos',
      key: 'totalImpostos',
    },
    {
      title: 'CUSTO FINAL PRODUTO (R$)',
      dataIndex: 'valorTotalCompra',
      key: 'custoFInalProduto',
    },
    {
      title: 'CUSTO FINAL PRODUTO + IMPOSTOS',
      dataIndex: 'valorTotalProduto',
      key: 'custoRemessa',
    }
  ]


  return (
    <div>
      <HeaderPages />
      <div className='.conteiner-calc'>
        <div id='card-calc'>
          <Card className='card-calc'>
            <Row>

              <Col span={12}>
                <h1> CALCULADORA DE IMPORTAÇÃO</h1>
                <Form {...layout}>
                  <Form.Item label={'$ REAL(USD)'}>
                    <InputNumber min={0} onChange={e => setPrecoReal(e)} />
                  </Form.Item>
                  <Form.Item label={'INVOICE(USD)'}>
                    <InputNumber min={0} onChange={e => setPrecoInvoice(e)} />
                  </Form.Item>
                  <Form.Item label={'FRETE(USD)'}>
                    <InputNumber min={0} onChange={e => setFrete(e)} />
                  </Form.Item>
                </Form>
                <Form id='form-btn'>
                  <Form.Item {...tailLayout}>
                    <Button onClick={() => calcular(precoReal, precoInvoice, frete)}>CALCULAR</Button>
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={() => setDataSource([])}>Limpar</Button>
                  </Form.Item>
                  <Form.Item>
                    <Button icon={<SettingFilled />} onClick={() => setShowModalSetTax(true)} />
                  </Form.Item>
                </Form>
              </Col>

              <Col span={12}>
                <h1>CALCULADORA PORCENTAGEM DE VENDA</h1>
                <Form>
                  <Form.Item label={'PREÇO VENDA'}>
                    <InputNumber min={0} onChange={e => setVenda(e)} />
                  </Form.Item>
                  <Form.Item label={'PRECO COMPRA'}>
                    <InputNumber min={0} onChange={e => setCompra(e)} />
                  </Form.Item>
                  <Form.Item label={'RESULTADO'}>
                    <span>{respostaPorcentagemValor ? respostaPorcentagemValor : 0} %</span>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </div>
        {console.log('DataSource: ', [...dataSource])}

        {/* renderização da tabela Ant */}
        <div className='table'>

          <Table scroll={true} id='table' pagination={false} dataSource={[...dataSource]} columns={columns} />;

        </div>

      </div>

      <Modal
        id='modal-tax-config'
        visible={showModalSetTax}
        closable={false}
        footer={
          <Button
            key="submit"
            type="primary"
            onClick={() => setShowModalSetTax(false)}          >
            Cancel
          </Button>
        }
      >
        <Form id="modal-tax-config" onFinish={configTax}>
          <Form.Item label="Aliquota" name="aliquota">
            <InputNumber
              min={0}
              max={100}
              defaultValue={
                configTaxBd[0] && (
                  configTaxBd[0].aliquota
                )
              }
            />
          </Form.Item>
          <Form.Item label="Imposto de importação" name="importTax">
            <InputNumber min={0} max={100}
              defaultValue={
                configTaxBd[0] && (
                  configTaxBd[0].importTax
                )
              }

            />
          </Form.Item>
          <Form.Item label="ICMS" name="icms">
            <InputNumber min={0} max={100}
              defaultValue={
                configTaxBd[0] && (
                  configTaxBd[0].icms
                )
              }

            />
          </Form.Item>
          <Form.Item label="IOF" name="iof">
            <InputNumber min={0} max={100}
              defaultValue={
                configTaxBd[0] && (
                  configTaxBd[0].iof
                )
              }

            />
          </Form.Item>
          <Form.Item label="TAX alibaba" name="taxAlibaba">
            <InputNumber min={0} max={100}

              defaultValue={
                configTaxBd[0] && (
                  configTaxBd[0].alibaba
                )
              }

            />
          </Form.Item>
          <Form.Item label="TAX DHL" name="taxDhl">
            <InputNumber min={0} max={1000}

              defaultValue={
                configTaxBd[0] && (
                  configTaxBd[0].dhl
                )
              }

            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gravar
            </Button>
          </Form.Item>
        </Form>
      </Modal>



    </div>
  )
}