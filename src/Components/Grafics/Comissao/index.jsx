import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import './grafic-comissao.css'

function GraficComissao(){
    
    return(
        <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "column",
            styledMode: true, 
          },
          title: {
            text: 'Teste'
        },
        subtitle: {
            text: 'Teste Highcharts REACT'
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