import React, { useState, useEffect, useContext } from "react";
import firebase from "../../Services/firebaseConnection";
import { InputNumber, Form, Button, Row, Col, Card, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import "./calculadoras.css";
import HeaderPages from "../../Components/Headers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoedaContext } from "../../Contexts/moeda";

import { Table } from "antd";

export default function Calculadora() {
  const { moeda } = useContext(MoedaContext);

  // const { moeda } = useContext(MoedaContext)
  const [precoReal, setPrecoReal] = useState();
  const [precoInvoice, setPrecoInvoice] = useState();
  const [frete, setFrete] = useState();
  const [venda, setVenda] = useState(0);
  const [compra, setCompra] = useState(0);
  const [showModalSetTax, setShowModalSetTax] = useState(false);
  const [configTaxBd, setConfigTaxBd] = useState([]);

  // Hook Obj resultados dos calculos
  const [custosImportacao, setCustosImportacao] = useState([]);

  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 16,
    },
  };
  // // const tailLayout = {
  // //   wrapperCol: {
  // //     offset: 10,
  // //     span: 16,
  // //   },
  // };

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
            alibaba: doc.data().alibaba,
          });
        });

        setConfigTaxBd(lista);
      });
    }

    getTax();
  }, []);

  const initialValues = {
    aliquota: configTaxBd[0] && configTaxBd[0].aliquota,
    importTax: configTaxBd[0] && configTaxBd[0].importTax,
    icms: configTaxBd[0] && configTaxBd[0].icms,
    iof: configTaxBd[0] && configTaxBd[0].iof,
    taxDhl: configTaxBd[0] && configTaxBd[0].dhl,
    taxAlibaba: configTaxBd[0] && configTaxBd[0].alibaba,
    // Adicione mais campos e valores iniciais conforme necessário
  };

  // atualiza as taxas no banco de dados
  async function configTax(fieldsValue) {
    console.log("fieldsValue", fieldsValue);
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
        dhl: fieldsValue.taxDhl,
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
    const taxAlibaba = initialValues.taxAlibaba;
    const taxaImportacao = initialValues.importTax;
    const taxaIof = initialValues.iof;
    const taxaIcms = initialValues.icms;
    const valorFixDhl = initialValues.taxDhl;
    const moedaValue = moeda.ask; //moeda.ask

    // convertendo valores prod e ship em real
    const valorProdutoInvoiceBrl = precoInvoice * moedaValue;
    const valorFreteBrl = freteUsd * moedaValue;

    const valorProdutoInvoiceMaisFreteBrl =
      valorProdutoInvoiceBrl + valorFreteBrl;

    const custoTaxaImportacao =
      valorProdutoInvoiceMaisFreteBrl * (taxaImportacao / 100);

    const custoTaxaIof = valorProdutoInvoiceMaisFreteBrl * (taxaIof / 100);

    const custoTaxaIcms =
      ((valorProdutoInvoiceMaisFreteBrl + custoTaxaImportacao) /
        (1 - taxaIcms / 100)) *
      (taxaIcms / 100);

    const valorTotalTributos =
      custoTaxaImportacao + custoTaxaIcms + custoTaxaIof + valorFixDhl;

    const valorTotalCompra =
      valorProdutoInvoiceMaisFreteBrl  + valorTotalTributos;

    const valorTotalProduto = valorProdutoInvoiceMaisFreteBrl + (precoReal * moedaValue);

    // Obj que será add no Hook custosImportacao []

    const costValue = [
      {
        custoTaxImport: custoTaxaImportacao && custoTaxaImportacao.toFixed(2),
        custoTaxaIcms: custoTaxaIcms && custoTaxaIcms.toFixed(2),
        custoTaxaIof: custoTaxaIof && custoTaxaIof.toFixed(2),
        valorTotalTributos: valorTotalTributos && valorTotalTributos.toFixed(2),
        valorTotalCompra: valorTotalCompra && valorTotalCompra.toFixed(2),
        valorTotalProduto: valorTotalProduto && valorTotalProduto.toFixed(2),
        taxAlibaba: taxAlibaba && taxAlibaba.toFixed(2),
      },
    ];

    setCustosImportacao((prevCustosImportacao) =>
      prevCustosImportacao.concat(costValue)
    );
  }
  const respostaPorcentagemValor = ((venda - compra) / compra) * 100;

  const columns = [
    {
      title: "CUST. TAXA IMPORT. (R$)",
      dataIndex: "custoTaxImport",
      key: "custoTaxImport",
    },
    {
      title: "ICMS (R$)",
      dataIndex: "custoTaxaIcms",
      key: "icms",
    },
    {
      title: "IOF (R$)",
      dataIndex: "custoTaxaIof",
      key: "iof",
    },
    {
      title: "TOTAL IMPOSTOS (R$)",
      dataIndex: "valorTotalTributos",
      key: "totalImpostos",
    },
    {
      title: "TOTAL DA COMPRA  (R$)",
      dataIndex: "valorTotalCompra",
      key: "custoFInalProduto",
    },
    {
      title: "CUSTO FINAL PRODUTO + IMPOSTOS",
      dataIndex: "valorTotalProduto",
      key: "custoRemessa",
    },
  ];

  return (
    <div>
      <HeaderPages />
      <div className=".conteiner-calc">
        <Row className="row-calc">
          <Card className="card-calc">
            <Col span={12}>
              <h1> CALCULADORA DE IMPORTAÇÃO</h1>
              <Form {...layout}>
                <Form.Item label={"$ REAL(USD)"}>
                  <InputNumber min={0} onChange={(e) => setPrecoReal(e)} />
                </Form.Item>
                <Form.Item label={"INVOICE(USD)"}>
                  <InputNumber min={0} onChange={(e) => setPrecoInvoice(e)} />
                </Form.Item>
                <Form.Item label={"FRETE(USD)"}>
                  <InputNumber min={0} onChange={(e) => setFrete(e)} />
                </Form.Item>
              </Form>
              <div id="div-btns-calc-import">
                <Button
                  className="btn-calc-import"
                  onClick={() => calcular(precoReal, precoInvoice, frete)}
                >
                  CALCULAR
                </Button>

                <Button
                  className="btn-calc-import"
                  onClick={() => setCustosImportacao([])}
                >
                  Limpar
                </Button>

                <Button
                  icon={<SettingFilled />}
                  onClick={() => setShowModalSetTax(true)}
                />
              </div>
            </Col>

            <Col span={12}>
              <h1>CALCULADORA PORCENTAGEM DE VENDA</h1>
              <Form>
                <Form.Item label={"PREÇO VENDA"}>
                  <InputNumber min={0} onChange={(e) => setVenda(e)} />
                </Form.Item>
                <Form.Item label={"PRECO COMPRA"}>
                  <InputNumber min={0} onChange={(e) => setCompra(e)} />
                </Form.Item>
                <Form.Item label={"RESULTADO"}>
                  <span>
                    {respostaPorcentagemValor ? respostaPorcentagemValor : 0} %
                  </span>
                </Form.Item>
              </Form>
            </Col>
          </Card>
        </Row>

        <Row className="row-calc">
          <Table
            className="table"
            scroll={true}
            id="table"
            pagination={false}
            dataSource={[...custosImportacao]}
            columns={columns}
          />
        </Row>
      </div>

      <Modal
        id="modal-tax-config"
        open={showModalSetTax}
        closable={false}
        footer={
          <Button
            key="submit"
            type="primary"
            onClick={() => setShowModalSetTax(false)}
          >
            Cancel
          </Button>
        }
      >
        <Form
          id="modal-tax-config"
          initialValues={initialValues}
          onFinish={configTax}
        >
          <Form.Item label="Aliquota" name="aliquota">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="Imposto de importação" name="importTax">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="ICMS" name="icms">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="IOF" name="iof">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="TAX alibaba" name="taxAlibaba">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label="TAX DHL" name="taxDhl">
            <InputNumber min={0} max={1000} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gravar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
