'use client'
import React, { useState, useEffect } from "react";
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



ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);



const LineGraph = (props) => {
   
  const [mychartData, mysetChartData] = useState({
    data1: [150, 200, 180, 220, 300, 250, 270, 290, 210, 340, 350, 370, 100, 340, 400],
    time: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
  }); 
  

 const [time, setTime] = React.useState(null)
    
 var data2 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        datasets: [
          {
            label: 'Graph label',
            data: mychartData.data1,
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
      console.log(mychartData.data1)
      // if (props.data === "...") {
       // return}
        ///if (props.time === time) {
       /// ///  return
      //  }
       // setTime(props.time)
   


//console.log(new Date(new Date (props.time)- 5.5 * 60 * 60 * 1000).getMinutes())

        //chartData.data.shift()
        //chartData.data.push(Number(props.data))
      
        //chartData.time.shift()
       //chartData.time.push(new Date(props.time).getMinutes())
      }, );

   




      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'black',
              font: {
                size: 14,
                family: 'Arial',
                weight: 'bold',
              },
            },
        }
        },
      };
    
     

      return(
        <>
         
        <div  style={{ display:'inline-block', border: '1px, solid, black', margin:'5px'}}><div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block' }}><Line data={data2} options={options} /></div></div>
       

        </>
    );
      
      
    };

export default LineGraph;