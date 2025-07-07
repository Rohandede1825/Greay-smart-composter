'use client';

import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Image from "next/image";
import { updateUser } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.userData.users);

  const userDispatch = () => {
    const id = props.id;
    const name = { ...reduxData[0].name, [props.mykey]: "line" };
    dispatch(updateUser([props.id, [{ id, name }]]));
  };

  const [chartData, setChartData] = useState({
    labels: Array(15).fill('-'),
    datasets: Array(15).fill(0),
  });

  const [graphtime, setGraphTime] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [avg, setAvg] = useState(0);

  // ✅ Generate green shades and white border
  const generateGreenShade = (i) => {
    const green = 120 + i * 5; // controls green intensity
    const red = 50 + i * 2;
    const blue = 50 + i;
    return `rgb(${Math.min(red, 140)}, ${Math.min(green, 200)}, ${Math.min(blue, 100)})`;
  };

  const backgroundColors = chartData.datasets.map((_, i) => generateGreenShade(i));
  const borderColors = chartData.datasets.map(() => '#ffffff');

  const data = {
    labels: chartData.labels,
    datasets: [{
      label: props.Label,
      data: chartData.datasets,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1.2, // ✅ thin white border
    }]
  };

  const options = {
    responsive: false,
    plugins: {
      legend: false,
    }
  };

  useEffect(() => {
    if (props.priviousData?.length > 5 && !repeat) {
      const newLabels = [...chartData.labels];
      const newDataset = [...chartData.datasets];
      props.priviousData.slice(0, 15).forEach((d, i) => {
        newDataset[i] = d[props.mykey];
        newLabels[i] = new Date(d.time).getMinutes();
      });
      setChartData({ labels: newLabels, datasets: newDataset });
      setRepeat(true);
    }
  }, [props.priviousData]);

  useEffect(() => {
    if (props.data === "..." || props.time === graphtime) return;

    setGraphTime(props.time);
    const newDataset = [...chartData.datasets];
    const newLabels = [...chartData.labels];

    newDataset.shift();
    newDataset.push(Number(props.data));
    newLabels.shift();
    newLabels.push(new Date(props.time).getMinutes());

    setChartData({ labels: newLabels, datasets: newDataset });

    const sum = newDataset.reduce((acc, val) => acc + val, 0);
    setAvg(Number((sum / newDataset.length).toFixed(2)));
  }, [props.data, props.time]);

  return (
    <div
      style={{
        backgroundColor: props.bg,
        margin: '10px',
        position: 'relative',
        height: '360px',
        border: '3px solid #000',
        borderRadius: '16px',
        background: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        padding: '10px',
      }}
    >
      {/* Header */}
      <div style={{ height: '90px', position: 'relative' }}>
        <Image
          src={props.image}
          alt=""
          width={40}
          height={40}
          style={{ position: 'absolute', top: '8px', right: '12px' }}
        />

        <div style={{ position: 'absolute', top: '55px', left: '10px' }}>
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

        <div style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#2f8b0b',
          fontFamily: 'Roboto, sans-serif',
          position: 'absolute',
          top: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {props.Label}
        </div>

        <div style={{
          fontSize: '38px',
          color: '#096d12',
          fontFamily: 'Futura, sans-serif',
          position: 'absolute',
          top: '34px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {props.data}
        </div>

        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#2da733',
          position: 'absolute',
          top: '4px',
          left: '10px',
        }}>
          Average
        </div>

        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: '#2da733',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '8px',
          position: 'absolute',
          top: '25px',
          left: '10px',
        }}>
          {avg}
        </div>

        <div style={{
          position: 'absolute',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#08642b',
          top: '44px',
          right: '12px',
        }}>
          {props.unit}
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#fff',
        border: '3px solid black',
        height: '190px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
