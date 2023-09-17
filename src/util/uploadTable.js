import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import XLSX from 'xlsx';
//const firebase = require('firebase/app');


const firebaseConfig = {
  apiKey: "a",
  authDomain: "a",
  projectId: "a",
  storageBucket: "a",
  messagingSenderId: "a",
  appId: "a",
  measurementId: "a"
};
// Inicializar o app do Firebase
firebase.initializeApp(firebaseConfig);

// Referência para o Firestore
const db = firebase.firestore();

// Função para fazer o upload do arquivo XLS para o Firestore
async function uploadXlsToFirestore(file) {
  try {
    const workbook = XLSX.readFile(file);
    const sheetName = workbook.SheetNames[0]; // Assumindo que o arquivo XLS possui apenas uma planilha
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Opção "header: 1" para usar a primeira linha como cabeçalho

    const headers = data[0]; // Obter o cabeçalho
    const rows = data.slice(1); // Remover a primeira linha (cabeçalho)

    // Criar um objeto para cada linha com base no cabeçalho e enviar para o Firestore
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const docData = {};

      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        let value = row[j];
        if(value === undefined){
          value = "-"
        }
        docData[header] = value;
      }

      await db.collection('partsTable').add(docData);
    }

    console.log('Upload concluído com sucesso.');
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo XLS:', error);
  }
}

// Chamada da função de upload (substitua 'caminho/para/o/arquivo.xls' pelo caminho do arquivo no seu sistema)
uploadXlsToFirestore('C:/Users/Fabio/Documents/tabela_peças_bd.xlsx');
