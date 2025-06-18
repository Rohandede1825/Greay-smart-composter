'use client'
import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Image from "next/image";
import humidity from '../../../public/Image/humidity.png';
import temperature from '../../../public/Image/temperature.png';
import ph from '../../../public/Image/ph.png';
import H2S from '../../../public/Image/H2S.png';
import CO2 from '../../../public/Image/CO2.png';
import NH3 from '../../../public/Image/NH3.png';
import CH4 from '../../../public/Image/CH4.png';
import Earth from '../../../public/Image/Earth.png';
import { useRouter } from 'next/navigation';
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import LineGraph from "../Cpmponents/LineGraph";
import PiChart from "../Cpmponents/PiChart";
import BarGraph from "../Cpmponents/BarGraph";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, updateUser, addUser } from '../redux/slice';
import Link from 'next/link'

function page() {
  const [graphselect, SetGraphselect] = useState({ Humidity: 'line', Temperature: 'bar', Ph: 'pi', H2s: 'line', Ammonia: "line", Methane: "line", Co2: "bar" })
  const [rtkid, setRtkid] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUser([graphselect]))
  }, []);

  const reduxData = useSelector((state) => state.userData.users);
  useEffect(() => {
    if (reduxData.length > 0) {
      setRtkid(reduxData[0].id)
      SetGraphselect(reduxData[0].name)
    }
  }, [reduxData]);

  const [data, setData] = useState({ "Humidity": "...", "Temperature": "...", "Ph": "...", "H2s": "--", "Ammonia": "...", "Methane": "...", "Co2": "..", "time": "updating please wait...", })
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [nstartDate, setStartDaten] = useState(new Date());
  const [nendDate, setEndDaten] = useState(new Date());
  const [my, setMy] = useState('null');
  const router = useRouter();

  const getdata = async () => {
    try {
      const response = await fetch(window.location.origin + '/api/users/sensorslog');
      const result = await response.json();
      setData(await result[0]).catch(error => { return });
    } catch (error) { return }
  };

  const getFirstGraphdata = async () => {
    try {
      const response = await fetch(window.location.origin + '/api/users/sensorslog?purp=20');
      const graphData = await response.json();
      setMy(graphData);
    } catch (error) {}
  };

  useEffect(() => {
    getdata();
    getFirstGraphdata();
    const intervalId = setInterval(getdata, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const onLogoff = () => {
    setLoading1(true);
    try {
      fetch(window.location.origin + '/api/users/logoff')
        .then((response) => response.json())
        .then(() => router.push('./login'))
        .catch((error) => {});
    } catch {
      setLoading1(false);
    }
  }

  const fetchDataAndCreateExcel = async () => {
    setLoading(true);
    let a = new Date(nstartDate);
    let b = new Date(nendDate);
    a.setHours(0,0,0,0);
    b.setHours(23,59,59,999);
    try {
      const res = await fetch(window.location.origin + '/api/users/sensorslog?purp=filterbydate&s=' + a + '&e=' + b);
      const exceldata = await res.json();
      const worksheet = XLSX.utils.json_to_sheet(exceldata);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sensor_Data');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'Sensors_Data.xlsx');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <Image src={Earth} width={60} height={60} alt="" style={{ marginRight: '15px' }} />
            <h1 style={{ color: "#73B10F", fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Greya Smart Composer</h1>
          </div>
          <div>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '20px' }}>
              A Smart IoT-Enabled Device for On-Site Wet Waste Processing
            </p>
          </div>
        </div>

        {/* Date Pickers and Generate Report */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '14px' }}>
              Start Date: <span style={{ fontWeight: 'bold' }}>28-05-2025</span>
            </div>
            <div style={{ fontSize: '14px' }}>
              End Due
            </div>
          </div>
          <button 
            style={{
              backgroundColor: '#73B10F',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={fetchDataAndCreateExcel}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>



              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>

              {
                graphselect.Humidity == "line" ? (<LineGraph data={data.Humidity} time={data.time} Label={'Humidity'} priviousData={my} mykey={'Humidity'} id={rtkid} image={humidity} bg={'rgb(255, 255, 255)'} unit={"%"} />)
                  : graphselect.Humidity == "bar" ? (<BarGraph data={data.Humidity} time={data.time} Label={'Humidity'} priviousData={my} mykey={'Humidity'} id={rtkid} image={humidity} bg={'rgb(255, 255, 255)'} unit={"%"} />)
                    : graphselect.Humidity == "pi" ? (<PiChart data={data.Humidity} time={data.time} Label={'Humidity'} priviousData={my} mykey={'Humidity'} id={rtkid} image={humidity} bg={'rgb(255, 255, 255)'} unit={"%"} />)
                      : <>nfnfn</>
              }


              {
                graphselect.Temperature == "line" ? (<LineGraph data={data.Temperature} time={data.time} Label={'Temperature'} priviousData={my} mykey={'Temperature'} id={rtkid} image={temperature} bg={'rgb(255, 255, 255)'} unit={<>&#176;C</>} />)
                  : graphselect.Temperature == "bar" ? (<BarGraph data={data.Temperature} time={data.time} Label={'Temperature'} priviousData={my} mykey={'Temperature'} id={rtkid} image={temperature} bg={'rgb(255, 255, 255)'} unit={<>&#176;C</>} />)
                    : graphselect.Temperature == "pi" ? (<PiChart data={data.Temperature} time={data.time} Label={'Temperature'} priviousData={my} mykey={'Temperature'} id={rtkid} image={temperature} bg={'rgb(255, 255, 255)'} unit={<>&#176;C</>} />)
                      : <>nfnfn</>
              }

              {
                graphselect.Ph == "line" ? (<LineGraph data={data.Ph} time={data.time} Label={'pH'} priviousData={my} mykey={'Ph'} id={rtkid} image={ph} bg={'rgb(255, 255, 255)'} unit={"pH"} />)
                  : graphselect.Ph == "bar" ? (<BarGraph data={data.Ph} time={data.time} Label={'pH'} priviousData={my} mykey={'Ph'} id={rtkid} image={ph} bg={'rgb(255, 255, 255)'} unit={"pH"} />)
                    : graphselect.Ph == "pi" ? (<PiChart data={data.Ph} time={data.time} Label={'pH'} priviousData={my} mykey={'Ph'} id={rtkid} image={ph} bg={'rgb(255, 255, 255)'} unit={"pH"} />)
                      : <>nfnfn</>
              }


              {
                graphselect.H2s == "line" ? (<LineGraph data={data.H2s} time={data.time} Label={'H2S'} priviousData={my} mykey={'H2s'} id={rtkid} image={H2S} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                  : graphselect.H2s == "bar" ? (<BarGraph data={data.H2s} time={data.time} Label={'H2S'} priviousData={my} mykey={'H2s'} id={rtkid} image={H2S} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                    : graphselect.H2s == "pi" ? (<PiChart data={data.H2s} time={data.time} Label={'H2S'} priviousData={my} mykey={'H2s'} id={rtkid} image={H2S} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                      : <>nfnfn</>
              }

              {

                graphselect.Ammonia == "line" ? (<LineGraph data={data.Ammonia} time={data.time} Label={'Ammonia'} priviousData={my} mykey={'Ammonia'} image={NH3} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                  : graphselect.Ammonia == "bar" ? (<BarGraph data={data.Ammonia} time={data.time} Label={'Ammonia'} priviousData={my} mykey={'Ammonia'} image={NH3} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                    : graphselect.Ammonia == "pi" ? (<PiChart data={data.Ammonia} time={data.time} Label={'Ammonia'} priviousData={my} mykey={'Ammonia'} image={NH3} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                      : <>nfnfn</>
              }


              {
                graphselect.Methane == "line" ? (<LineGraph data={data.Methane} time={data.time} Label={'Methane'} priviousData={my} mykey={'Methane'} image={CH4} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                  : graphselect.Methane == "bar" ? (<BarGraph data={data.Methane} time={data.time} Label={'Methane'} priviousData={my} mykey={'Methane'} image={CH4} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                    : graphselect.Methane == "pi" ? (<PiChart data={data.Methane} time={data.time} Label={'Methane'} priviousData={my} mykey={'Methane'} image={CH4} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                      : <>nfnfn</>
              }

              {
                graphselect.Co2 == "line" ? (<LineGraph data={data.Co2} time={data.time} Label={'CO2'} priviousData={my} mykey={'Co2'} image={CO2} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                  : graphselect.Co2 == "bar" ? (<BarGraph data={data.Co2} time={data.time} Label={'CO2'} priviousData={my} mykey={'Co2'} image={CO2} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                    : graphselect.Co2 == "pi" ? (<PiChart data={data.Co2} time={data.time} Label={'CO2'} priviousData={my} mykey={'Co2'} image={CO2} bg={'rgb(255, 255, 255)'} unit={"ppm"} />)
                      : <>nfnfn</>
              }


            </div>

        {/* Dashboard Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {/* Humidity Card */}
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Avg 3.33</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Humidity</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>50%</div>
              <div style={{ height: '4px', backgroundColor: '#ddd', borderRadius: '2px', marginBottom: '5px' }}>
                <div style={{ width: '50%', height: '100%', backgroundColor: '#73B10F', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>0</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* H2S Card */}
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Avg NaN</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>H₂S</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>--</div>
            </div>
          </div>

          {/* Temperature Card */}
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Avg 2.03</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Temperature</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>30.4°C</div>
            </div>
          </div>

          {/* PH Card */}
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Avg 35.13</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>PH</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>5.4</div>
            </div>
          </div>

          {/* Methane Card */}
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Methane</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>435.13</div>
            </div>
          </div>
        </div>


        

        {/* Version Info */}
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#888' }}>
          v0.0.36
        </div>
      </div>
    </>
  );
}

export default page;


