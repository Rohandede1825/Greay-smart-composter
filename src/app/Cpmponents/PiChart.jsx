'use client';
import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS,ArcElement, LineElement, CategoryScale, LinearScale,PointElement, Tooltip, Legend,} from 'chart.js';
import LineG from './LineGraph.module.css'
import Image from "next/image";
import change from '../../../public/Image/change.png'
ChartJS.register( LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend,);
import { addUser, updateUser } from '../redux/slice'
import { useDispatch, useSelector } from 'react-redux'
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {

const dispatch = useDispatch();
 const reduxData = useSelector((state) => state.userData.users);
 const userDispatch = () => {
 var id = props.id
 var name = reduxData[0].name
 name ={...name, [props.mykey]: "line"}
 var name =[{id, name} ]
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
   
  




    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: props.Label,
                data:chartData.datasets,
                backgroundColor: [
                          'rgb(89, 153, 36)',
               'rgb(184, 202, 21)',
                'rgb(41, 73, 14)',
                'rgb(88, 168, 22)',
                'rgb(85, 151, 31)',
                'rgb(162, 196, 40)',
                'rgb(130, 201, 72)',
                 'rgb(29, 184, 93)',
                  'rgb(115, 156, 20)'
                ],
                borderColor: [
                         'rgb(89, 153, 36)',
               'rgb(184, 202, 21)',
                'rgb(41, 73, 14)',
                'rgb(88, 168, 22)',
                'rgb(85, 151, 31)',
                'rgb(162, 196, 40)',
                'rgb(130, 201, 72)',
                 'rgb(29, 184, 93)',
                  'rgb(115, 156, 20)'
                ],
                borderWidth: 1,
            },
        ],
    };

const options = {
    responsive: false,
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

 useEffect(() => {





    if (props.priviousData != null || props.priviousData != undefined) {

      if (props.priviousData.length > 5) {
        if (repeat !== true) {
          props.priviousData.map((data, index) => {
            if (index < 15) {
              chartData.datasets[index] = data[props.mykey]
              chartData.labels[index] = new Date(new Date(data.time)).getMinutes()
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
        <div className={LineG.heading} ><Image src={props.image} className={LineG.img} width={40} height={40} alt="" />
          <div className={LineG.btncontainer}> <button  onClick={() => (userDispatch())}></button>
         </div>  
       
          <div className={LineG.sensorName}>{props.Label}</div>
          <div className={LineG.sensorValue}>{props.data} </div>
             <div className={LineG.avgtxt}>Average  </div> 
             <div className={LineG.avg}> {avg} </div> 
          <div className={LineG.sensorUnit}>{props.unit}</div>
        </div>
        <div style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'inline-block', border: '1px, solid, black', margin: '5px' }}>
          <div style={{ position: 'relative', width: '100%', height: '150px', display: 'inline-block', top:'50%', transform: 'translate(0%, 4px)' }}>
            <Pie data={data} options={options} />
          </div>
        </div>
    
      </div>
   
</>
);};

export default PieChart;