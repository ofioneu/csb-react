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
  const [showNoActiveAwbMessage, setShowNoActiveAwbMessage] = useState(false);
  

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
          toast.info("AWB encontrados: ", awb); // Aqui você pode fazer o que desejar com o valor do campo awb
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


    useEffect(() => {
    if (!awbList[0]) {
      // Se a lista awbList estiver vazia, defina showNoActiveAwbMessage como true após 5 segundos
      const timeoutId = setTimeout(() => {
        setShowNoActiveAwbMessage(true);
      }, 5000); // 5000 milissegundos (5 segundos)

      return () => {
        clearTimeout(timeoutId); // Limpa o timeout ao desmontar o componente
      };
    }
  }, [awbList]);



  // Dentro da função handleSearch:
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

        if (results.length === 0) {
          toast.error("Nenhum resultado encontrado.");
        } else {
          // Preencher os campos do formulário com os valores da pesquisa
          const awbData = results[0];
          form.setFieldsValue({
            invoiceNumber: awbData.invoiceNumber,
            invoiceDate: moment(awbData.invoiceDate),
            amount: awbData.amount,
            highPay: moment(awbData.highPay),
            reduceValue: awbData.reduceValue,
            lowPay: moment(awbData.lowPay),
            awb: results[0].awb,
            description: awbData.description,
            switchAwb: awbData.switchAwb,
          });

          // Atualizar o estado com os resultados
          setSearchResults(awbData);
        }
      })
      .catch((error) => {
        // Tratar erros, se necessário
        console.error("Erro na consulta ao Firestore:", error);
      });
  };

  const handleSubmit = async (values) => {
    console.log("Valores do formulário:", values);
    try {
      const formattedValues = {
        ...values,
        invoiceDate: moment(values.invoiceDate).format("YYYY-MM-DD"),
        highPay: moment(values.highPay).format("YYYY-MM-DD"),
        lowPay: moment(values.lowPay).format("YYYY-MM-DD"),
        switchAwb: values.switchAwb || false,
      };

      // Verifica se já existe um documento com o mesmo AWB
      const existingDoc = await importacoesCollection
        .where("awb", "==", formattedValues.awb)
        .get();

      if (existingDoc.docs.length > 0) {
        // Se um documento com o mesmo AWB existe, atualize-o
        const docRef = existingDoc.docs[0].ref;
        await docRef.update(formattedValues);
        toast.success("Documento atualizado com ID:", docRef.id);
      } else {
        // Caso contrário, crie um novo documento
        const docRef = await importacoesCollection.add(formattedValues);
        toast.success("Documento criado com ID:", docRef.id);
      }

      // Limpar o formulário após o envio
      form.resetFields();
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Erro ao salvar no Firestore:", error);
    }
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
                  {
                    pattern: /^[0-9]+$/, // Aceita apenas números inteiros
                    message: "Invoice number must be a valid integer.",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setSearchInvoiceNumber(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() =>
                    handleSearch("invoiceNumber", searchInvoiceNumber)
                  }
                >
                  Pesquisar
                </Button>
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
                >
                  Pesquisar
                </Button>
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
                  <span
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => {
                      setModalAwb(true);
                      fetchData();
                    }}
                    id="btnListAwb"
                  >
                    {" "}
                    {awb}
                  </span>
                </li>
              ))}

             {!awbList[0] && !showNoActiveAwbMessage && (
              <div>
                <Spin />
              </div>
            )}

            {showNoActiveAwbMessage && <p>Nenhum AWB ativo.</p>}
          </ul>
        </div>
      </Col>
      </div>
      <Modal
        open={modalAwb}
        closable={false}
        footer={<Button onClick={() => setModalAwb(false)}>Ok</Button>}
      >
        <ul>
          {console.log("eventsModal: ", events)}
          {events[0] &&
            events.map((event, index) => {
              return (
                <li index={index}>
                  {event.timestamp} - {event.description}
                </li>
              );
            })}
          {!events[0] && <Spin></Spin>}
        </ul>
      </Modal>
    </div>
  );
}
