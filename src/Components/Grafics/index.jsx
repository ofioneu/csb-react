import React, {useState, useEffect} from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import './grafic.css'
// import firebase from "../../firebaseConnection";

function GraficComissao(){
  // const db = firebase.firestore();
  const [removeCredits, setRemoveCredits] = useState('')
  // const [data, setData] = useState([])
  
  useEffect(()=>{
    setRemoveCredits(()=>{
      const value =document.getElementsByClassName('highcharts-credits')
      value[0].innerHTML=''
      return(value)
    }) 
     
  },[removeCredits])


  // async function dataGrafic() {
  //   const hono = db.collection("honorarios");
  //   await hono
  //     .where("data", "==", '10/2021')//ajustar aqui
  //     .get()
  //     .then((snapshot) => {
  //       let lista = [];

  //       snapshot.forEach((doc) => {
  //         lista.push({
  //           id: doc.id,
  //           pagamento: doc.data().pagamento,
  //           data: doc.data().data,
  //           comissao: doc.data().comissao,
  //           comentario: doc.data().comentario,
  //         });
  //         console.log(lista)
  //       });
  //     });
  // }

  // dataGrafic()
       
    
    return(
        <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "column",
            styledMode: true, 
          },
          title: {
            text: 'Comissão'
        },
        subtitle: {
            text: 'Comissão Mensal'
        },
        xAxis: {
          categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
          ],
        },

        series: [{
          name: 'Comissão',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]  
      }]       
        }}
      />
    )
}

export default GraficComissao