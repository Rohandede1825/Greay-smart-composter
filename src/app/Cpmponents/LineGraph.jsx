'use client';
import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
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
import { updateUser } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineGraph = (props) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.userData.users);

  const userDispatch = () => {
    var id = props.id;
    var name = reduxData[0].name;
    name = { ...name, [props.mykey]: "line" };
    var nameArr = [{ id, name }];
    dispatch(updateUser([props.id, nameArr]));
  };

  const [chartData, setChartData] = useState({
    labels: Array(15).fill('-'),
    datasets: Array(15).fill(0),
  });

  const [graphtime, setGraphTime] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [avg, setAvg] = useState(0);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: props.Label,
        data: chartData.datasets,
        fill: true,
        tension: 0.3,
        borderColor: 'rgb(115, 194, 51)',
        backgroundColor: 'rgba(115, 194, 51, 0.2)',
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    if (props.priviousData && props.priviousData.length > 5 && !repeat) {
      const updatedData = [...chartData.datasets];
      const updatedLabels = [...chartData.labels];
      props.priviousData.slice(0, 15).forEach((data, index) => {
        updatedData[index] = data[props.mykey];
        updatedLabels[index] = new Date(data.time).getMinutes();
      });
      setChartData({ labels: updatedLabels, datasets: updatedData });
      setRepeat(true);
    }
  }, [props.priviousData]);

  useEffect(() => {
    if (props.data === "..." || props.time === graphtime) return;

    setGraphTime(props.time);
    const updatedData = [...chartData.datasets];
    updatedData.shift();
    updatedData.push(Number(props.data));
    const updatedLabels = [...chartData.labels];
    updatedLabels.shift();
    updatedLabels.push(new Date(props.time).getMinutes());
    setChartData({ labels: updatedLabels, datasets: updatedData });

    const sum = updatedData.reduce((a, b) => a + Number(b), 0);
    setAvg(Number((sum / updatedData.length).toFixed(2)));
  }, [props.data, props.time]);

  return (
    <div
      style={{
        backgroundColor: props.bg,
        margin: '10px',
        position: 'relative',
        height: '340px',
        border: '3px solid #000',
        borderRadius: '16px',
        background: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        padding: '10px',
      }}
    >
      {/* Header */}
      <div style={{ height: '80px', position: 'relative' }}>
        <Image
          src={props.image}
          alt=""
          width={40}
          height={40}
          style={{ position: 'absolute', top: '8px', right: '12px' }}
        />

        <div style={{ position: 'absolute', top: '50px', left: '10px' }}>
          <button
            onClick={userDispatch}
            style={{
              backgroundColor: '#066b14',
              width: '30px',
              height: '30px',
              border: 'none',
              clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
              boxShadow: '0 4px #024d0e, 0 6px 20px rgba(0, 0, 0, 0.19)',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          ></button>
        </div>

        <div
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#2f8b0b',
            fontFamily: 'Roboto, sans-serif',
            position: 'absolute',
            top: '4px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {props.Label}
        </div>

        <div
          style={{
            fontSize: '38px',
            color: '#096d12',
            fontFamily: 'Futura, sans-serif',
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'blink 1.2s infinite',
          }}
        >
          {props.data}
        </div>

        <div
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#2da733',
            position: 'absolute',
            top: '4px',
            left: '10px',
          }}
        >
          Average
        </div>

        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: '#2da733',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '8px',
            position: 'absolute',
            top: '25px',
            left: '10px',
          }}
        >
          {avg}
        </div>

        <div
          style={{
            position: 'absolute',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#08642b',
            top: '40px',
            right: '12px',
          }}
        >
          {props.unit}
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#fff',
          border: '2px solid black',
          height: '180px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
