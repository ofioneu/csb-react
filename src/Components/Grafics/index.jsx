import React, {useState, useEffect} from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import './grafic.css'
import firebase from "../../firebaseConnection";
import {Spin} from 'antd'

function GraficComissao(){
  const db = firebase.firestore();
  const [removeCredits, setRemoveCredits] = useState('')
  const [dataPg, setDataPg] = useState()
  
  useEffect(()=>{
    setRemoveCredits(()=>{
      if(dataPg){
      const value =document.getElementsByClassName('highcharts-credits')
      value[0].innerHTML=''
      return(value)
      }
    }) 
     
  },[dataPg])

  useEffect(()=>{
    async function dataGrafic() {
      const hono = db.collection("honorarios");
      await hono
        .orderBy('data')
        .limit(12)
        .get()
        .then((snapshot) => {
          let listaAll = [];
          let listaPg = [];
  
          snapshot.forEach((doc) => {
            listaAll.push({
              id: doc.id,
              pagamento: doc.data().pagamento,
              data: doc.data().data,
              comissao: doc.data().comissao,
              comentario: doc.data().comentario,
            });

            listaPg.push(
              doc.data().pagamento
            )
            let listPgNum = []
            listaPg.forEach((i)=>{              
              listPgNum.push(i)
            })

            setDataPg(listPgNum)
            console.log('ListaAll: ',listaAll)
            console.log('ListaPg: ',listaPg)
            console.log('dataPg: ',dataPg)
          });
        });
    }
    dataGrafic()

  },[db])
   
  
    return(
      <div>
        {dataPg && (
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
          data:  [dataPg[0], dataPg[1], dataPg[2], dataPg[3], dataPg[4], dataPg[5], dataPg[6], dataPg[7], dataPg[8], dataPg[9], dataPg[10], dataPg[11] ]
      }]       
        }}
      />
      )}
      {!dataPg &&(
        <Spin tip='Loading...'/>
      )}
    </div>
    )
    
}

export default GraficComissao