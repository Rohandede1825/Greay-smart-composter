'use client';

import React, { useState, useEffect } from "react";
import LineG from './LineGraph.module.css'
import Image from "next/image";
import change from '../../../public/Image/change.png'
import { Bar } from 'react-chartjs-2';
import {
// Import necessary libraries
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import {  updateUser } from '../redux/slice'
import { useDispatch, useSelector } from 'react-redux'


const BarGraph = (props) => {

const dispatch = useDispatch();
 const reduxData = useSelector((state) => state.userData.users);

const userDispatch = () => {
var id = props.id
var name = reduxData[0].name
name ={...name, [props.mykey]: "pi"}
var name =[{id, name} ]
//console.log('in bar')
//console.log(name)
dispatch(updateUser([props.id, name]))
}
 
  
 
  
  
  
  
  const [chartData, setChartData] = useState({
       labels: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
       datasets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     });
   
     const [graphtime, setGraphTime] = useState(null)
     const [repeat, setRepeat] = useState(false)
     const [graphdata, setGraphData] = useState(1)
     const [avg, setAvg]=useState(0)
   
   
    // Data for the bar graph
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label:  props.Label,
                data: chartData.datasets,
               borderColor: props.bg,
             
               backgroundColor: [
                      'rgb(89, 153, 36)',
               'rgb(85, 151, 31)',
                'rgb(41, 73, 14)',
                'rgb(88, 168, 22)',
                'rgb(85, 151, 31)',
                'rgb(90, 192, 7)',
                'rgb(130, 201, 72)',
               
                   ],
                borderColor: [
            'rgb(255, 255, 255)',
                    'rgb(255, 255, 255)',
               
                ],
              
              
                borderWidth: 1,
            },
        ],
    };

    // Options for the bar graph
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            legend: false,
            title: {
                display: false,
                text: 'Monthly Sales Data',
            },
        },
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
   var sum = Number (chartData.datasets[0])+ Number (chartData.datasets[1])+ Number(chartData.datasets[2])+ Number(chartData.datasets[3])+ Number(chartData.datasets[4])+ Number(chartData.datasets[5])+ Number(chartData.datasets[6])+ Number(chartData.datasets[7])+ Number(chartData.datasets[8])+ Number(chartData.datasets[9])+ Number(chartData.datasets[10])+ Number(chartData.datasets[11])+ Number(chartData.datasets[12])+ Number(chartData.datasets[13])+ Number(chartData.datasets[14])
  const average = Number (sum / chartData.datasets.length);
 setAvg(Number(average.toFixed(2)));
  },);









    return (
   <>

 <div  style={{ backgroundColor: props.bg }} className={LineG.container}>
        <div className={LineG.heading} ><Image  src={props.image} className={LineG.img} width={40} height={40} alt="" />
          <div className={LineG.btncontainer}>  <button  onClick={() => (userDispatch())}></button>   </div>
          <div className={LineG.sensorName}>{props.Label}</div>
          <div className={LineG.sensorValue}>{props.data} </div>
             <div className={LineG.avgtxt}>Average  </div> 
             <div className={LineG.avg}> {avg} </div> 
          <div className={LineG.sensorUnit}>{props.unit}</div>
        </div>
        <div style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'inline-block', border: '1px, solid, black', margin: '5px' }}>
          <div style={{ position: 'relative', width: '100%', height: '150px', display: 'inline-block' }}>
           
              <Bar data={data} options={options} />
          </div>
        </div>
      </div>


   </>
   



      

);
};

export default BarGraph;

//