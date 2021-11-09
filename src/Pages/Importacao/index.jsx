import "./importacao.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Modal,
  Row,
  Col,
  InputNumber,
  Space,
  Spin,
  Card,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import firebase from "../../Services/firebaseConnection";
import NumberFormat from "react-number-format";
import moment from "moment";
import { toast } from "react-toastify";
import { SettingFilled } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import api from '../../Services/api'

export default function Comissao() {
  const dateFormat = "YYYY/MM/DD";
  const db = firebase.firestore();
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState({});
  const [response, setResponse] = useState([]);
  const [modalConfigTax, setModalConfigTax] = useState(false);
  const [configTaxBd, setConfigTaxBd] = useState([]);
  const [vProd, setVprod] = useState();
  const [vFrete, setVfrete] = useState();
  const [resultados, setResultados] = useState({});
  const [moeda, setMoeda] = useState([])


  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

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
          });
        });

        setConfigTaxBd(lista);
      });
    }
    
    getTax();
    
  }, []);

  useEffect(()=>{
    async function loadMoeda(){
      const response = await api.get('last/USD-BRL')
      setMoeda(response.data.USDBRL);      
  }
  loadMoeda()
  }, [])
  
  useEffect(()=>{
    let vProdBrl =0
    let vFreteBrl =0
    let vTotalBrl =0
    let importTax =0
    let iof =0
    let icms =0
    let vTotalTributos = 0
    let vTotalCompra = 0

    function round(value){
     let vRound= Math.round(value*100)/100
     return vRound
    }

    if(configTaxBd[0] !== undefined && vProd !== undefined && vFrete !== undefined){     
    vProdBrl = round(vProd * moeda.ask)
    vFreteBrl =  round(vFrete * moeda.ask)
    vTotalBrl =  round(vFreteBrl + vProdBrl)
    importTax =   round(vTotalBrl * (configTaxBd[0].importTax/100))
    iof =  round(vTotalBrl * (configTaxBd[0].iof/100))
    icms = round(((vTotalBrl + importTax)/(1-(configTaxBd[0].icms/100)))*(configTaxBd[0].icms/100))
    vTotalTributos = round(importTax+iof+icms)
    vTotalCompra = round(vTotalTributos+vTotalBrl)
    
    setResultados({
      vProdBrl: vProdBrl,
      vFreteBrl: vFreteBrl,
      vTotalBrl: vTotalBrl,
      vTotalTributos:vTotalTributos,
      vTotalCompra: vTotalCompra,
      importTax: importTax,
      iof: iof,
      icms: icms      
    })
    }

  },[vProd, vFrete,configTaxBd, moeda])

  function usdRemessa(e){
    setVprod(e)
  }
  function usdFrete(e){
    setVfrete(e)
  }

  async function handleAdd(fieldsValue) {
    if (
      fieldsValue["comentario"] == null ||
      fieldsValue["comentario"] === undefined
    ) {
      fieldsValue["comentario"] = "vazio";
    }
    await firebase
      .firestore()
      .collection("importacao")
      .add({
        custo: fieldsValue.custo,
        dolar: fieldsValue.dolar,
        data: moment(fieldsValue.data).format(dateFormat),
        comentario: fieldsValue.comentario,
      })
      .then(() => {
        toast.success("DADOS CADASTRADO COM SUCESSO!");
        form.resetFields();
      })
      .catch((error) => {
        toast.error("GEROU ALGUM ERRO!");
      });
  }

  function rangeDate(range) {
    let startDate = range[0].format(dateFormat);
    let endDate = range[1].format(dateFormat);
    setDateRangePicker({ start: startDate, end: endDate });
  }

  async function toFind() {
    const importacao = db.collection("importacao");
    await importacao
      .where("data", ">=", dateRangePicker.start)
      .where("data", "<=", dateRangePicker.end)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          toast.error("No matching documents.");
          return;
        }
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            custo: doc.data().custo,
            dolar: doc.data().dolar,
            data: doc.data().data,
            comentario: doc.data().comentario,
          });
        });

        setResponse(lista);
        lista = [];
        setIsModalVisible(true);
        form.resetFields();
      });
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  function sowModalConfgTax() {
    setModalConfigTax(true);
  }

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
      })
      .then(() => {
        toast.success("DADOS CADASTRADO COM SUCESSO!");
        setModalConfigTax(false);
      })
      .catch((error) => {
        toast.error("GEROU ALGUM ERRO!");
      });
  }



  return (
    <div>
      <Row>
        <Col span={12} className="importacao-form">
          <Form onFinish={handleAdd} form={form} {...layout}>
            <Form.Item
              label="R$ Custo"
              name="custo"
              rules={[
                {
                  required: true,
                  message: "Por favor, ensira o valor do custo!",
                },
              ]}
            >
              <NumberFormat
                id="input-custo"
                thousandSeparator={true}
                className="input-custo"
              />
            </Form.Item>

            <Form.Item
              label="R$ Dolar"
              name="dolar"
              rules={[
                {
                  required: true,
                  message: "Por favor, ensira o valor do dolar!",
                },
              ]}
            >
              <NumberFormat thousandSeparator={true} id="input-dolar" />
            </Form.Item>

            <Form.Item
              label="data"
              name="data"
              rules={[
                {
                  required: false,
                  message: "Por favor, ensira a data!",
                },
              ]}
            >
              <DatePicker picker="month" format={dateFormat} />
            </Form.Item>

            <Form.Item
              label="Comentario"
              name="comentario"
              rules={[{ required: false }]}
            >
              <Input.TextArea id="input-comentario" />
            </Form.Item>
            <Space id="space-btn-gravar">
              <Button id="btn-gravar" type="primary" htmlType="submit">
                Gravar
              </Button>
            </Space>
          </Form>
          <Form id="form-pesquisa-data" onFinish={toFind}>
            <Space>
              <Form.Item>
                <RangePicker onChange={rangeDate} format={dateFormat} />
              </Form.Item>
              <Button
                className="search"
                shape="circle"
                icon={<SearchOutlined />}
                size="large"
                htmlType="submit"
              />
            </Space>
          </Form>
        </Col>

        <Col span={12}>
          <div id="resultados">
            {configTaxBd[0] &&(
            <Row>
              <Col>
              <Card size="small" title="Cálculo" style={{ width: 300 }}>
                <span>Valor do produto (BRL): {resultados.vProdBrl}</span><br/>
                <span>Custo do frete (BRL): {resultados.vFreteBrl}</span><br/>
                <span>TOTAL DA COMPRA (BRL): {resultados.vTotalBrl}</span><br/>
                <span>Imposto de importação (BRL): {resultados.importTax}</span><br/>
                <span>ICMS: {resultados.icms}</span><br/>
                <span>IOF: {resultados.iof}</span><br/>
              </Card>
              </Col>
              <Col>
              <Card size="small" title="Totais" style={{ width: 300 }}>
                <span>TOTAL DE TRIBUTOS: {resultados.vProdBrl}</span><br/>
                <span>VALOR FINAL COM IMPOSTOS: {resultados.vTotalCompra}</span><br/>
              </Card>
              </Col>
            </Row>
            )}

            {!configTaxBd[0] && (<div><Spin tip="Loading..." id='spin'/></div>)}
          </div>
          <Form id="input-calc">
            <Form.Item label="Valor do produto (USD):" name="usdRemessa">
              <InputNumber onChange={usdRemessa} />
            </Form.Item>
            <Form.Item label="Custo do frete (USD):" name="usdFrete">
              <InputNumber
                onChange={usdFrete}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  onClick={sowModalConfgTax}
                  type="primary"
                  icon={<SettingFilled />}
                />
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Modal
        title="Configuração de impostos"
        visible={modalConfigTax}
        closable={false}
        footer={
          <Button
            key="submit"
            type="primary"
            onClick={() => setModalConfigTax(false)}
          >
            Cancel
          </Button>
        }
      >
        <Form id="form-modal-importacao-config-tax" onFinish={configTax}>
          <Form.Item label="Aliquota" name="aliquota">
            <InputNumber
              min={0}
              max={100}
              defaultValue={
                configTaxBd[0] && (
                  <span>Aliquota: {configTaxBd[0].aliquota} </span>
                )
              }
            />
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gravar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Resultado"
        visible={isModalVisible}
        footer={
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>
        }
      >
        <ul>
          {response.map((res) => {
            return (
              <li key={res.id}>
                <span>custo: {res.custo} </span> <br />
                <span>Dolar: {res.dolar} </span> <br />
                <span>Data: {res.data} </span> <br />
                <span>Comentario: {res.comentario} </span> <br />
              </li>
            );
          })}
        </ul>
      </Modal>
    </div>
  );
}
