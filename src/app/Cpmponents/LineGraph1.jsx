'use client'
import React, { useState, useEffect } from "react";
import profile1 from '../profile/page1.module.css'
import profile from '../profile/profile.module.css'
import { Line } from 'react-chartjs-2';
import humidity from '../../../public/Image/humidity.png'
import Image from "next/image";
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



const LineGraph = (props) => {

  const [chartData, setChartData] = useState({
    labels: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    datasets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [graphtime, setGraphTime] = useState(null)
  const [repeat, setRepeat] = useState(false)
  const [graphdata, setGraphData] = useState(1)
  const [avg, setAvg]=useState(0)
  var data2 = {
    labels: chartData.labels,
    datasets: [
      {
        label: props.Label,
        data: chartData.datasets,
        borderColor: props.bg,
        backgroundColor: 'rgb(226, 218, 218)',
        tension: 0,
        pointRadius: 3,
        pointHoverRadius: 7,
        fill: true,
        borderWidth: 2,
        pointColor: 'rgb(177, 182, 99)',

      },
    ],
  };




  useEffect(() => {
    if (props.priviousData != null || props.priviousData != undefined) {

      if (props.priviousData.length > 5) {
        if (repeat !== true) {
          props.priviousData.map((data, index) => {
            if (index < 15) {
              chartData.datasets[index] = data[props.mykey]
              chartData.labels[index] = new Date(new Date(data.time) - 5.5 * 60 * 60 * 1000).getMinutes()
            }
          })
          setGraphData(props.priviousData[0]._id)
          setRepeat(true)
        }
        setGraphData(props.priviousData[0]._id)
        setRepeat(true)
      }
    }
  },);




  useEffect(() => {
    if (props.data === "...") {
      return
    }
    if (props.time === graphtime) {
      return
    }
    setGraphTime(props.time)
    chartData.datasets.shift()
    chartData.datasets.push(Number(props.data))
    chartData.labels.shift()
    chartData.labels.push(new Date(new Date(props.time) - 5.5 * 60 * 60 * 1000).getMinutes())
   



   var sum = Number (chartData.datasets[0])+Number (chartData.datasets[1])+Number(chartData.datasets[2])+Number(chartData.datasets[3])+Number(chartData.datasets[4])+Number(chartData.datasets[5])+Number(chartData.datasets[6])+Number(chartData.datasets[7])+Number(chartData.datasets[8])+Number(chartData.datasets[9])+Number(chartData.datasets[10])+Number(chartData.datasets[11])+Number(chartData.datasets[12])+Number(chartData.datasets[13])+Number(chartData.datasets[14])
  const average = sum / chartData.datasets.length;
 setAvg(average.toFixed(2));
  },);






  const options = {
    responsive: true,
    plugins: {

      customCanvasBackgroundColor: {
        color: 'red',
      },

      legend: {
        backgroundColor: "red",
        position: 'bottom',
        color: 'red',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
        },
      },
      legend: false,
    },
  };



  return (
    <>
      <div className={profile1.container} style={{ backgroundColor: props.bg}}>
        <div className={profile1.heading} ><Image src={props.image} className={profile.img} width={40} height={40} alt="" />
          <div className={profile1.sensorName}>{props.Label}</div>
          <div className={profile1.sensorValue}>{props.data} </div> {avg}
          <div className={profile1.sensorUnit}>%</div>
        </div>
        <div style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'inline-block', border: '1px, solid, black', margin: '5px' }}>
          <div style={{ position: 'relative', width: '100%', height: '150px', display: 'inline-block' }}>
            <Line data={data2} options={options} />
          </div>
        </div>
      </div>
    </>
  );


};

export default LineGraph;