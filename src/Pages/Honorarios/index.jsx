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

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const gravar = (fieldsValue) => {
    async function handleAdd() {
      if(fieldsValue.comentario==null || fieldsValue.comentario===undefined){
        fieldsValue.comentario = 'vazio'
      }
      await firebase
        .firestore()
        .collection("honorarios")
        .add({
          pagamento: fieldsValue.pagamento,
          comissao: fieldsValue.comissao,
          data: moment(fieldsValue.datePicker).format(dateFormat),
          comentario: fieldsValue.comentario,
        })
        .then(() => {
          toast.success("DADOS CADASTRADO COM SUCESSO!");
        })
        .catch((error) => {
          toast.error("GEROU ALGUM ERRO!");
        });
    }
    handleAdd();
    form.resetFields();
  };

  function getValue() {
    const data = document.getElementById("input-data").value;
        toFind(data);
    
  }

  async function toFind(fieldValue) {
    const hono = db.collection("honorarios");
    await hono
      .where("data", "==", fieldValue)
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
  return (
    <div>
      <Row>
        <Col span={12} id="comisaao-form">
          <Form onFinish={gravar} form={form} {...layout}>
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
              label="data"
              name="data"
              rules={[
                {
                  required: false,
                  message: "Por favor, ensira o mês!",
                },
              ]}
            >
              <Input.Group>
              <DatePicker id="input-data"  picker='month' format={dateFormat} /> 
              <Button
                  className="search"
                  shape="circle"
                  icon={<SearchOutlined />}
                  size="large"
                  onClick={getValue}
                  htmlType='button'
                />
              </Input.Group> 
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
