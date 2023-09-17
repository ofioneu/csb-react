import React, { useEffect, useState } from "react";
import HeaderPages from "../../Components/Headers";
import { Table } from "antd";
import "antd/dist/antd.css";
import firebase from "../../Services/firebaseConnection";

// Referência para o Firestore
const db = firebase.firestore();

export default function TabelaDadosFirestore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar dados do Firestore
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("partsTable").get();
        const fetchedData = snapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao recuperar os dados do Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const columns = Object.keys(data[0] || {}).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }));

  return (
    <div>
      <HeaderPages />
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
        locale={{ emptyText: "Nenhum dado disponível" }} // Remova essa linha se não for necessário
      />
    </div>
  );
}
