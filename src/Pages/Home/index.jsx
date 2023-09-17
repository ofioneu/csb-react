import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spin } from "antd";
import { CopyOutlined } from "@ant-design/icons";
// import { DragDropContext } from "react-beautiful-dnd";
import "./home.css";
import HeaderPages from "../../Components/Headers";
// import Cards from "../../Components/Cards";
// import FooterPages from '../../Components/Footer'
import { toast } from "react-toastify";
import firebase from "../../Services/firebaseConnection";

export default function Home() {
  const [bankData, setBankData] = useState([]);
  const [legalData, setLegalData] = useState([]);
  const [linksData, setLinksData] = useState([]);

  const db = firebase.firestore();

  useEffect(() => {
    // Função para buscar os documentos da coleção
    const fetchDocuments = async () => {
      try {
        const collectionRef = db.collection("bankData");
        const snapshot = await collectionRef.get();

        const fetchedDocuments = snapshot.docs.map((doc) => doc.data());

        setBankData(fetchedDocuments);
      } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
      }

      try {
        const collectionRef = db.collection("legalData");
        const snapshot = await collectionRef.get();

        const fetchedDocuments = snapshot.docs.map((doc) => doc.data());

        setLegalData(fetchedDocuments);
      } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
      }

      try {
        const collectionRef = db.collection("cardsHome");
        const snapshot = await collectionRef.get();

        const fetchedDocuments = snapshot.docs.map((doc) => doc.data());

        setLinksData(fetchedDocuments);
      } catch (error) {
        console.error("Erro ao buscar os documentos --> links:", error);
      }
    };

    // Chame a função para buscar os documentos da coleção
    fetchDocuments();
  }, []);

  //função copiar texto do card
  function copy(idKey) {
    let textoCopiado = document.getElementById(idKey).innerText;
    navigator.clipboard
      .writeText(textoCopiado)
      .then(() => {
        toast.success("Texto copiado!");
      })
      .catch((err) => {
        toast.error("Error");
        console.log("Error ao copiar: " + err);
      });
  }

  return (
    <div>
      <HeaderPages />
      <div id="conteiner-home">
        <Row>
          <Col span={12} id="col-1">
            <div className="site-card-border-less-wrapper">
              <Card
                className="card"
                title={"Dados Bancários"}
                actions={[
                  <Button
                    onClick={() => copy(bankData[0].bankNumber)}
                    icon={<CopyOutlined />}
                  ></Button>,
                ]}
              >
                {bankData[0] && (
                  <ul id={bankData[0].bankNumber}>
                    <li>{bankData[0].bankName}</li>
                    <li>{bankData[0].bankNumber}</li>
                    <li>{bankData[0].ag}</li>
                    <li>{bankData[0].cc}</li>
                    <li>{bankData[0].accountName}</li>
                    <li>{bankData[0].pix}</li>
                    <li>{bankData[0].site}</li>
                    <li>{bankData[0].frase}</li>
                  </ul>
                )}

                {!bankData[0] && (
                  <div>
                    <Spin />
                  </div>
                )}
              </Card>

              <Card
                className="card"
                title={"Dados Jurídicos"}
                actions={[
                  <Button
                    onClick={() => copy(legalData[0].cnpj)}
                    icon={<CopyOutlined />}
                  ></Button>,
                ]}
              >
                {legalData[0] && (
                  <ul id={legalData[0].cnpj}>
                    <li>{legalData[0].corporateName}</li>
                    <li>{legalData[0].adress}</li>
                    <li>{legalData[0].cep}</li>
                    <li>{legalData[0].cnpj}</li>
                    <li>{legalData[0].ie}</li>
                  </ul>
                )}

                {!legalData[0] && (
                  <div>
                    <Spin />
                  </div>
                )}
              </Card>
            </div>
          </Col>

          <Col span={12} id="col-2">
            <div className="site-card-border-less-wrapper">
              {!linksData[0] && (
                <div>
                  <Spin />
                </div>
              )}

              <Card className="card" title="Forncedores">
                <Button
                  type="link"
                  href="https://www.chillerpecas.com.br/"
                  target="_blank"
                >
                  Chiller Peças
                </Button>
                <Button
                  type="link"
                  href="https://siberianopecas.com.br/"
                  target="_blank"
                >
                  Siberiano
                </Button>
                <Button
                  type="link"
                  href="https://qualipecas.com.br/"
                  target="_blank"
                >
                  Qualipeças
                </Button>
              </Card>

              <Card className="card" title="DHL">
                <Button
                  type="link"
                  href="https://mydhl.express.dhl/br/pt/auth/login.html"
                  target="_blank"
                >
                  DHL EXPRESS
                </Button>
                <Button
                  type="link"
                  href="https://mybill.dhl.com/login/?next=/dashboard/"
                  target="_blank"
                >
                  MYBILL
                </Button>
              </Card>

              <Card className="card" title="FISCAL">
                <Button
                  type="link"
                  href="http://www.sintegra.gov.br/"
                  target="_blank"
                >
                  SINTEGRA
                </Button>
                <Button
                  type="link"
                  href="https://hortolandia.ginfes.com.br/"
                  target="_blank"
                >
                  NF-e SERVIÇO
                </Button>
                <Button
                  type="link"
                  href="https://www.leitorxml.com/#"
                  target="_blank"
                >
                  XML READER
                </Button>
              </Card>

              <Card className="card" title="Email">
                <Button
                  type="link"
                  href="https://webmail1.hostinger.com.br/?_task=logout&_token=L2I6DvEPB1GsgQ2gQhMMOINrmKZKbiGJ"
                  target="_blank"
                >
                  EMAIL
                </Button>
              </Card>
              <Card className="card" title="Duratex">
                <Button
                  type="link"
                  href="http://dexco.levelgestao.com.br/MinhaConta/Logon.aspx?ReturnUrl=%2fControleTerceiros%2fAnaliseDocumentosCadastraisTerceiro.aspx"
                  target="_blank"
                >
                  Gestão Fornecedores
                </Button>
                <Button
                  type="link"
                  href="https://jira.duratex.com.br/login.jsp"
                  target="_blank"
                >
                  Jira
                </Button>
              </Card>
              <Card className="card" title="AGIR">
                <Button
                  type="link"
                  href="https://ecompras.agirsaude.org.br/v/Default.aspx?parms=52F72D3798851D747BD5FCC6A1916D19F41E2C5748B2836D160BF3630131992B"
                  target="_blank"
                >
                  Compras
                </Button>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
