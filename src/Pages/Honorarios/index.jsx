import "./honorarios.css";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Modal,
  Row,
  Col,
  Space,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";

import firebase from "../../firebaseConnection";
import GraficComissao from "../../Components/Grafics";
import NumberFormat from "react-number-format";
import moment from "moment";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Honorarios() {
  const dateFormat = "YYYY/MM";
  const db = firebase.firestore();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [response, setResponse] = useState([]);
  const [datePicker, setDatePicker] = useState()

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  async function handleAdd(fieldsValue) {
      if(fieldsValue.comentario==null || fieldsValue.comentario===undefined){
        fieldsValue.comentario = 'vazio'
      }
      console.log(moment(datePicker))
      await firebase
        .firestore()
        .collection("honorarios")
        .add({
          pagamento: Number(fieldsValue.pagamento),
          comissao: Number(fieldsValue.comissao),
          data: datePicker,
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
    


  async function toFind() {
    console.log(moment(datePicker))
    const hono = db.collection("honorarios");
    await hono
      .where("data", "==", datePicker)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          toast.error('No matching documents.');
          return;
        }
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            pagamento: doc.data().pagamento,
            data: doc.data().data,
            comissao: doc.data().comissao,
            comentario: doc.data().comentario,
          });
        });

        setResponse(lista)
        setIsModalVisible(true);
        form.resetFields();
      })
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  function onchangeDate(date, dateString){
    let data = moment(date).format(dateFormat)
    setDatePicker(data)
  }
  return (
    <div>
      <Row>
        <Col span={12} id="comisaao-form">
          <Form onFinish={handleAdd} form={form} {...layout}>
            <Form.Item
              label="R$ Pagamento"
              name="pagamento"
              rules={[
                {
                  required: true,
                  message: "Por favor, ensira o valor do pagamento!",
                },
              ]}
            >
              <NumberFormat
                id="input-pagamento"
                thousandSeparator={true}
                className="input-moeda"
              />
            </Form.Item>

            <Form.Item
              label="R$ Comissao"
              name="comissao"
              rules={[
                {
                  required: true,
                  message: "Por favor, ensira o valor da comissão!",
                },
              ]}
            >
              <NumberFormat thousandSeparator={true} id="input-comissao" />
            </Form.Item>
            
            <Form.Item
              label="Data"
              name="data"
              rules={[
                {
                  required: false,
                  message: "Por favor, ensira o mês!",
                },
              ]}
            >
            <Space>
                <DatePicker id="input-data"  picker='month' onChange={onchangeDate} />
                <Button
                  className="search"
                  shape="circle"
                  icon={<SearchOutlined />}
                  size="large"
                  onClick={toFind}
                  htmlType='button'
                />
            </Space>                                
            </Form.Item>

            <Form.Item
              label="Comentario"
              name="comentario"
              rules={[
                { required: false },
              ]}
            >
              <Input.TextArea id="input-comentario" />
            </Form.Item>
            <div className="btn-div">
              <Button id="btn-gravar" type="primary" htmlType="submit">
                Gravar
              </Button>
            </div>
          </Form>
        </Col>
        <Col span={12}>
          <GraficComissao />
        </Col>
      </Row>

      <Modal
        title="Resultado"
        visible={isModalVisible}
        closable={true}
        footer={
        <Button key="submit" type="primary" onClick={handleOk}>
        Ok
        </Button>
        }
      >
          <ol>  
        {    
        response.map((res) => {
          return(
            <li key={res.id}>
              <span>Pagamento: {res.pagamento} </span> <br />
              <span>Data: {res.data} </span> <br />
              <span>Comentario: {res.comentario} </span> <br />
              <span>Comissão: {res.comissao} </span> <br /> <br />
            </li>       
          )
        })}
      </ol>
      </Modal>
  
    </div>
  );
}
