import React from "react";
import { Card, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./cards.css";
//const documentJson = JSON.stringify(document)

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

// <Button
//     onClick={() => copy(document)}
//     icon={<CopyOutlined />}
//   ></Button>

const Cards = ({ document }) => {
  return (
    <div className="card">
      <h3>Dados Bancários</h3>
      {console.log("item", document)}
      <ul>
        {Array.isArray(document) && document.map((item, index) => (
          // console.log('F: ', item)
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cards;
