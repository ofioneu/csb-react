import React, { useState } from 'react';
import firebase from "../../Services/firebaseConnection";
import { Form, Input, InputNumber, DatePicker, Button, Row, Col } from 'antd';
import HeaderPages from '../../Components/Headers';


const ComissaoPage = () => {
  const [form] = Form.useForm();
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const onFinish = (values) => {
    // Salvar os dados no Firebase
    const db = firebase.firestore();
    db.collection('comissoes').add(values)
      .then(() => {
        console.log('Dados salvos com sucesso!');
        form.resetFields();
      })
      .catch((error) => {
        console.error('Erro ao salvar os dados: ', error);
      });
  };

  const exportarRelatorio = () => {
    if (dataInicial && dataFinal) {
      // Consultar os dados no Firebase com base nas datas selecionadas
      const db = firebase.firestore();
      db.collection('comissoes')
        .where('dataPagamento', '>=', dataInicial)
        .where('dataPagamento', '<=', dataFinal)
        .get()
        .then((querySnapshot) => {
          // Aqui você pode gerar o relatório com os dados recuperados
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
          });
        })
        .catch((error) => {
          console.error('Erro ao consultar os dados: ', error);
        });
    }
  };

  return (
    <div className='conteiner'>
        <HeaderPages/>
    <Row gutter={16}>
      <Col span={12}>
      <Form form={form} onFinish={onFinish}>
      <Form.Item name="numeroNF" label="Número da NF">
        <Input />
      </Form.Item>
      <Form.Item name="valorNF" label="Valor NF">
        <InputNumber />
      </Form.Item>
      <Form.Item name="custoNF" label="Custo NF">
        <InputNumber />
      </Form.Item>
      <Form.Item name="impostoNF" label="Imposto NF">
        <InputNumber />
      </Form.Item>
      <Form.Item name="lucroLiquido" label="Lucro Líquido">
        <InputNumber />
      </Form.Item>
      <Form.Item name="comissão" label="Comissão">
        <InputNumber />
      </Form.Item>
      <Form.Item name="dataPagamento" label="Data de Pagamento">
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
      </Col>
      <Col span={12}>
        <div>
          <DatePicker
            placeholder="Data Inicial"
            onChange={(date) => setDataInicial(date)}
          />
          <DatePicker
            placeholder="Data Final"
            onChange={(date) => setDataFinal(date)}
          />
          <Button type="primary" onClick={exportarRelatorio}>
            Exportar Relatório
          </Button>
        </div>
      </Col>
    </Row>
    </div>
  );
};

export default ComissaoPage;

  