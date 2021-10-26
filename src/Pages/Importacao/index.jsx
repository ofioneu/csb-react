import "./importacao.css";
import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Modal, Row, Col } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import firebase from "../../firebaseConnection";
import NumberFormat from "react-number-format";
import moment from "moment";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Comissao() {
  const dateFormat = "DD/MM/YYYY";
  const db = firebase.firestore();
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateRangePicker, setDateRangePicker] = useState({});
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
      if (
        fieldsValue.comentario == null ||
        fieldsValue.comentario === undefined
      ) {
        fieldsValue.comentario = "";
      }
      await firebase
        .firestore()
        .collection("importacao")
        .add({
          custo: fieldsValue.custo,
          dolar: fieldsValue.dolar,
          data: moment(fieldsValue.data).format("MM/YYYY"),
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

  function rangeDate(range){
    let startDate = range[0].format(dateFormat);
    let endDate = range[1].format(dateFormat);
    console.log(startDate)
    setDateRangePicker({start: startDate, end: endDate})
    toFind(dateRangePicker)
    form.resetFields();
  }

  async function toFind(value) {
    console.log("fields", value);
    const importacao = db.collection("importacao");
    console.log('value: ',importacao)
    // await importacao
    //   .where("data" <= "01/08/2021")
    //   .where("data" >= "25/10/2021")
    //   .get()
    //   .then((snapshot) => {
    //     let lista = [];

    //     snapshot.forEach((doc) => {
    //       lista.push({
    //         id: doc.id,
    //         custo: doc.data().custo,
    //         dolar: doc.data().dolar,
    //         data: doc.data().data,
    //         comentario: doc.data().comentario,
    //       });
    //     });
    //     console.log("Lista", lista);

    //     setResponse(lista);
    //     setIsModalVisible(true);
    //     form.resetFields();
    //   });
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Row>
        <Col span={12} id="importacao-form">
          <Form onFinish={gravar} form={form} {...layout}>
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
              <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item
              label="Comentario"
              name="comentario"
              rules={[{ required: false }]}
            >
              <Input.TextArea id="input-comentario" />
            </Form.Item>
            <div className="btn-div">
              <Button id="btn-gravar" type="primary" htmlType="submit">
                Gravar
              </Button>
            </div>
          </Form>

          <Form form={form}>
            <Form.Item>
              <RangePicker onChange={rangeDate} />
            </Form.Item>
              <Button
                className="search"
                shape="circle"
                icon={<SearchOutlined />}
                size="large"
                // onClick={getValue}
                htmlType="button"
              />
          </Form>
        </Col>
        <Col span={12}>
          <h1>Calculadora de importação aqui</h1>
        </Col>
      </Row>

      <Modal
        title="Resultado"
        visible={isModalVisible}
        footer={
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>
        }
      >
        <ol>
          {response.map((res) => {
            return (
              <li key={res.id}>
                <span>custo: {res.custo} </span> <br />
                <span>Dolar: {res.dolar} </span> <br /> <br />
                <span>Data: {res.data} </span> <br />
                <span>Comentario: {res.comentario} </span> <br />
              </li>
            );
          })}
        </ol>
      </Modal>
    </div>
  );
}
