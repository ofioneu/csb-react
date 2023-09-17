import React, { useState, useEffect } from "react";
import firebase from "../../Services/firebaseConnection";
import HeaderPages from "../../Components/Headers";
import { toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import "./importacao.css";
import {
  InputNumber,
  Input,
  Form,
  Button,
  Switch,
  Col,
  Card,
  DatePicker,
  Modal,
  Spin,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

global.ASYNC_VALIDATOR_NO_WARNING = 1;
const { TextArea } = Input;

export default function ImportacaoForm() {
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");
  const [searchAwb, setSearchsearchAwb] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [awbList, setAwbList] = useState([]);
  const [modalAwb, setModalAwb] = useState(false);

  const db = firebase.firestore();
  const importacoesCollection = db.collection("importacoes");

  const [form] = Form.useForm();

  

  
  

  useEffect(() => {
    // Função para buscar os documentos no Firestore
    const fetchDocuments = async () => {
      try {
        // Fazer a consulta com o filtro switchAwb
        const querySnapshot = await importacoesCollection
          .where("switchAwb", "==", true)
          .get();

        const awbArray = [];

        // Iterar sobre os documentos retornados
        querySnapshot.forEach((doc) => {
          // Obter o valor do campo awb

          const awb = doc.data().awb;
          toast.info('AWB encontrados: ',awb); // Aqui você pode fazer o que desejar com o valor do campo awb
          awbArray.push(awb);
          setAwbList(awbArray);
        });
      } catch (error) {
        toast.error("Erro ao buscar documentos:", error);
        console.error("Erro ao buscar documentos:", error);
      }
    };

    // Chamar a função de busca ao carregar o componente
    fetchDocuments();
  }, []);


  let options = {
    method: "GET",
    url: "https://api-eu.dhl.com/track/shipments",
    params: { trackingNumber: awbList[0] }, 
    headers: { "DHL-API-Key": "0QPbSWdBwP0m9laLl6VOdaEDvtJuhSwP" },
  };

 // useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.request(options).then(function (response) {
          console.log("response.data: ", response.data);
          const eventsData = response.data.shipments[0].events;
  
          // Verifica se eventsData é uma matriz vazia
          if (eventsData.length === 0) {
            toast.error("Os dados requeridos não foram retornados.");
          } else {
            setEvents(eventsData);
          }
        });
      } catch (error) {
        toast.error("Error fetching events:", error);
      }
    };
  
  //   // Define um timeout de 10 segundos (ou o valor que desejar)
  //   const timeoutId = setTimeout(() => {
  //     toast.error("Tempo esgotado - os dados requeridos não foram retornados.");
  //   }, 30000); // 30 segundos (30000 milissegundos)
  
  //   fetchData(); // Chamada imediata da função fetchData
  
  //   const interval = setInterval(fetchData, 3600000); // Atualiza a cada 1 hora
  
  //   // Limpa o timeout e o intervalo ao desmontar o componente
  //   return () => {
  //     clearTimeout(timeoutId);
  //     clearInterval(interval);
  //   };
  // //}, []);
  

 

  const handleSubmit = async (values) => {
    console.log("Valores do formulário:", values);
    // Realizar ações com os valores do formulário, como salvar no Firestore

    try {
      const formattedValues = {
        ...values,
        invoiceDate: moment(values.invoiceDate).format("YYYY-MM-DD"),
        highPay: moment(values.highPay).format("YYYY-MM-DD"),
        lowPay: moment(values.lowPay).format("YYYY-MM-DD"),
        switchAwb: values.switchAwb || false,
      };

      if (!(await importacoesCollection.get()).exists) {
        await importacoesCollection.doc().set({});
      }
      const docRef = await db.collection("importacoes").add(formattedValues);
      toast.success("Documento salvo com ID:", docRef.id);

      // Limpar o formulário após o envio
      form.resetFields();
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Erro ao salvar no Firestore:", error);
    }
  };

  // Função para lidar com a pesquisa
  const handleSearch = (fieldName, fieldValue) => {
    // Fazer a consulta ao Firestore
    db.collection("importacoes")
      .where(fieldName, "==", fieldValue)
      .get()
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          // Adicionar os documentos encontrados aos resultados
          results.push(doc.data());
        });

        const objectToString = () => {
          return Object.entries(results[0])
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        };

        // Atualizar o estado com os resultados
        setSearchResults(objectToString);

        // Abrir o modal
        setModalVisible(true);
      })
      .catch((error) => {
        // Tratar erros, se necessário
        console.error("Erro na consulta ao Firestore:", error);
      });
  };

  return (
    <div className="conteiner">
      <HeaderPages />
      <div className="conteinerCols">
        <Col span={12}>
          {/* <div className="formImport"> */}
          <Form className="form" form={form} onFinish={handleSubmit}>
            <div className="imputSearch">
              <Form.Item
                label="Invoice Number:"
                name="invoiceNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input invoice number!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setSearchInvoiceNumber(e.target.value)}
                />
                {console.log(searchInvoiceNumber)}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() =>
                    handleSearch("invoiceNumber", searchInvoiceNumber)
                  }
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Data Invoice:"
              name="invoiceDate"
              rules={[
                {
                  required: true,
                  message: "Please input invoice date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Valor Cheio:"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input amount invoice!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item
              label="Pagamento alto:"
              name="highPay"
              rules={[
                {
                  required: true,
                  message: "Please input high pay date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Valor baixo:"
              name="reduceValue"
              rules={[
                {
                  required: true,
                  message: "Please input reduce invoice!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              label="Pagamento baixo:"
              name="lowPay"
              rules={[
                {
                  required: true,
                  message: "Please input low pay date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <div className="imputSearch">
              <Form.Item
                label="AWB:"
                name="awb"
                rules={[
                  {
                    required: true,
                    message: "Please input AWB number!",
                  },
                ]}
              >
                <Input onChange={(e) => setSearchsearchAwb(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => handleSearch("awb", searchAwb)}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Descrição:"
              name="description"
              rules={[
                {
                  required: false,
                  message: "Please input description!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item label="Ativo" name="switchAwb" valuePropName="checked">
              <Switch checkedChildren="True" unCheckedChildren="False" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </Form>

          {/* </div> */}

          <Modal
            className="modalImportacao"
            title="Resultados da Pesquisa"
            open={modalVisible}
            footer={
              <Button
                key="submit"
                type="primary"
                onClick={() => setModalVisible(false)}
              >
                OK
              </Button>
            }
          >
            <TextArea rows={7} value={searchResults} />
          </Modal>
        </Col>
        <Col span={12}>
          <div>
            <h2>Events</h2>
            <ul>
              {awbList[0] &&
                awbList.map((awb, index) => (
                  <li key={index}>
                    <span style={{cursor:'pointer', color:'white'}} onClick={() => { setModalAwb(true); fetchData(); }} id="btnListAwb"> {awb}</span>

                  </li>
                ))}

              {!awbList[0] && (
                <div>
                  <Spin />
                </div>
              )}
            </ul>
          </div>
        </Col>
      </div>
      <Modal
      open={modalAwb}
      closable={false}
      footer={
        <Button onClick={() => setModalAwb(false)}>Ok</Button>
      }
      >
        <ul>
          {console.log("eventsModal: ", events)}
          {events[0] && (
              events.map((event, index)=>{
                return (<li index={index}>{event.timestamp} - {event.description}</li>)
              })
              
          
          )}
          {!events[0] && <Spin></Spin>}
        </ul>
      </Modal>
    </div>
  );
}
