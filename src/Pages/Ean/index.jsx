import React, { useState } from "react";
import HeaderPages from "../../Components/Headers";
import { Form, Button, Input, Typography  } from "antd";
import './ean.css'

const { TextArea } = Input;

export default function EANGenerator() {
  const [countryCode, setCountryCode] = useState("");
  const [manufacturerCode, setManufacturerCode] = useState("");
  const [productCode, setProductCode] = useState("");
  const [eanCode, setEanCode] = useState("");

  const generateEANCode = () => {
    console.log({        
            'countryCode': countryCode,
            'manufacturerCode': manufacturerCode,
            'productCode': productCode,

        })
    
    if (
      countryCode.length !== 3 ||
      manufacturerCode.length !== 5 ||
      productCode.length !== 4
    ) {
      alert("Por favor, insira códigos válidos para gerar o código EAN.");
      return;
    }

    let eanWithoutChecksum = countryCode + manufacturerCode + productCode;
    let sum = 0;
    let multiplier = 3;

    for (let i = eanWithoutChecksum.length - 1; i >= 0; i--) {
      sum += Number(eanWithoutChecksum.charAt(i)) * multiplier;
      multiplier = 4 - multiplier;
    }

    const checksum = (10 - (sum % 10)) % 10;
    const eanCode = eanWithoutChecksum + checksum;

    setEanCode(eanCode);
  };

  return (
    <div >
      <HeaderPages />
      <div className="conteiner">
      <Form className="form">
        <Form.Item label={"Country Code:"}>
          <Input
            name="countryCode"
            onChange={(e) => setCountryCode(e.target.value)}
          ></Input>
        </Form.Item>

        <Form.Item label={"Manufacturer Code:"}>
          <Input
            name="manufacturerCode"
            onChange={(e) => setManufacturerCode(e.target.value)}
          ></Input>
        </Form.Item>

        <Form.Item label={"Product Code:"}>
          <Input
            name="productCode"
            onChange={(e) => setProductCode(e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item label={"EAN Code:"}>
          <Typography.Text id="outputEan">{eanCode}</Typography.Text>
        </Form.Item>
        <Form.Item>
          <Button id="btnEan" onClick={generateEANCode}>Gerar EAN</Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
}
