'use client'
import React, { useState, useEffect } from "react";
import profile1 from '../profile/page1.module.css'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';



import { color } from 'chart.js/helpers';
import { preProcessFile } from "typescript";
;



ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,

  
 

);



const LineGraph =  (props) => {

  const [chartData, setChartData] = useState({
    labels:  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    datasets:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
const [graphtime, setGraphTime] = useState(null)
const [repeat, setRepeat] = useState(false)
const [graphdata, setGraphData] = useState(1)
  var data2 = {
    labels: chartData.labels,
    datasets: [
      {
        label: props.Label,
        data: chartData.datasets ,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0,
        pointRadius: 1.5,
        pointHoverRadius: 7,
        fill: true,
        borderWidth: 1,
      },
    ],
  };




useEffect(() => {
  
  if (props.priviousData != null || props.priviousData != undefined )   {
  
  if (props.priviousData.length > 5) {
    if(repeat !== true){

 props.priviousData.map((data, index) => {
      if (index < 15) {
        chartData.datasets[index] = data[props.mykey]
        chartData.labels[index] = new Date(new Date (data.time)- 5.5 * 60 * 60 * 1000).getMinutes()
      }
    })



console.log(props.priviousData[0][props.mykey])   
setGraphData(props.priviousData[0]._id)
    setRepeat(true)
  }

  setGraphData(props.priviousData[0]._id)
 setRepeat(true)
} 
}
  }

, );




  useEffect(() => {


   
 
  




    if (props.data === "...") {
    return}
   if (props.time === graphtime) {
    return
    }
setGraphTime(props.time)
    chartData.datasets.shift()
    chartData.datasets.push(Number(props.data))
    chartData.labels.shift()
    chartData.labels.push(new Date(new Date (props.time)- 5.5 * 60 * 60 * 1000).getMinutes())

  },);






  const options = {
    responsive: true,
    plugins: {
      
 customCanvasBackgroundColor: {
        color: 'black',
    },

      legend: {
          backgroundColor:"black",
        position: 'bottom',
        color:'red',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
        },
      },
  legend:false,
    },
  };



  return (
    <>




 

      <div style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'inline-block', border: '1px, solid, black', margin: '5px' }}><div style={{ position: 'relative', width: '100%', height: '150px', display: 'inline-block' }}><Line data={data2} options={options} /></div></div>
                                                                                                                                                                                         
                                

    </>
  );


};

export default LineGraph;