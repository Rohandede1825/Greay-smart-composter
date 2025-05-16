
//http://192.168.43.126:3000/api/users/sensorslog?purp=all
//http://192.168.43.126:3000/api/users/sensorslog?purp=filterbydate&s=2025-05-01T17:40:00Z&e=2025-05-01T17:50:00Z
'use client'
import React, { useState, useEffect } from "react";
import profile from './profile.module.css'
import profile1 from './page1.module.css'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Image from "next/image";
import humidity from '../../../public/Image/humidity.png';
import temperature from '../../../public/Image/temperature.png';
import ph from '../../../public/Image/ph.png';
import H2S from '../../../public/Image/H2S.png';
import CO2 from '../../../public/Image/CO2.png';
import NH3 from '../../../public/Image/NH3.png'
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

function page() {
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
      setData(await result[0])

        .catch(error => {
          return
        });
    }
    catch (error) {
      return
    }
  };


  const getFirstGraphdata = async () => {
    try {
      const response = await fetch(window.location.origin + '/api/users/sensorslog?purp=20');
      const graphData = await response.json();
      //console.log(graphData)
      setMy(graphData);
    } catch (error) {
    }
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

      .then(() => {
        router.push('./login')
      })
      .catch((error) => {

      });
    }
    catch {
      setLoading1(false);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  const fetchDataAndCreateExcel = async () => {
    setLoading(true);
    let a = new Date(nstartDate - 5.5 * 60 * 60 * 1000)
    let b = new Date(nendDate - 5.5 * 60 * 60 * 1000)

    try {
      // Example API call
      const res = await fetch(window.location.origin + '/api/users/sensorslog?purp=filterbydate&s=' + a + '&e=' + b);
      const exceldata = await res.json();

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(exceldata);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sensor_Data');

      // Generate buffer
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Save the file
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'Sensors_Data.xlsx');
    } catch (error) {
      console.error('Error creating Excel:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>

      <div className={profile.bg}>

        <div className={profile.Rightpanenl}>
         
         <div className={profile.UserInfomain}>

 <div className={profile.UserInfo} >
<Image src={Earth} width={100} height={100} alt=""  className={profile.UserInfo_1}  />
    <div className={profile.UserInfo_2}  >
           
            <h1 style={{ color: "rgb(115, 177, 15)",  fontSize:' 50px', fontWeight: '1000', textAlign: 'center', position:'relative',top:'50%', transform: 'translate(0%, -50% )' ,right: '50px' }}>Greya Smart Composter</h1>
            

</div>
</div>
 <div className={profile.UserInfo_3}  >

<h4 style={{ textAlign: 'center' }}>A Smart IoT-Enabled Device for On-Site Wet Waste Processing and Home Composting</h4>
 <button className={profile.logoff} onClick={(e) => (onLogoff(e))} disabled={loading1}>{loading1 ? '---' : ' Log Off '}</button>
 </div>


         
          </div>


          


          <div className={profile.Info}>



            <div className="container">
              <div className="row">
                <div className="col-auto col-md-auto">
                  Start Date:&nbsp;
                  <DateTimePicker
                    amPmAriaLabel="Select AM/PM"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    onChange={setStartDaten}
                    secondAriaLabel="Second"
                    value={nstartDate}
                    yearAriaLabel="Year"
                    format={"dd-MM-y h:mm:s a"} />
                  &nbsp;&nbsp;

                </div>
                <div className="col-auto col-md-auto ">
                  End Date:&nbsp;
                  <DateTimePicker
                    amPmAriaLabel="Select AM/PM"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    onChange={setEndDaten}
                    secondAriaLabel="Second"
                    value={nendDate}
                    yearAriaLabel="Year"
                    format={"dd-MM-y h:mm:s a"} />
                  &nbsp;&nbsp;
                </div>


                <div className="col-auto col-md-auto">
                  <button className="btn btn-secondary cfont-weight-bold" onClick={fetchDataAndCreateExcel} disabled={loading}>{loading ? 'Generating Excel...' : 'Generate Excel'}</button>
                </div>
              </div>
            </div>



            <div className="text-center">
              Last Updates:- {new Date(new Date(data.time) - 5.5 * 60 * 60 * 1000).toLocaleString()}
            </div>


            <div className={profile1.Content}>
              <LineGraph data={data.Humidity} time={data.time} Label={'Humidity'} priviousData={my} mykey={'Humidity'} image={humidity} bg={'rgb(182, 130, 99)'} />
              <BarGraph data={data.Temperature} time={data.time} Label={'Temperature'} priviousData={my} mykey={'Temperature'} image={temperature} bg={'rgb(150, 137, 206)'} />
              <PiChart data={data.Ph} time={data.time} Label={'pH'} priviousData={my} mykey={'Ph'} image={ph} bg={'rgb(177, 182, 99)'} />
              <LineGraph data={data.H2s} time={data.time} Label={'H2S'} priviousData={my} mykey={'H2s'} image={H2S} bg={'rgb(99, 182, 134)'} />
              <LineGraph data={data.Ammonia} time={data.time} Label={'Ammonia'} priviousData={my} mykey={'Ammonia'} image={NH3} bg={'rgb(99, 182, 178)'} />
              <LineGraph data={data.Methane} time={data.time} Label={'Methane'} priviousData={my} mykey={'Methane'} image={CH4} bg={'rgb(159, 99, 182)'} />
              <BarGraph data={data.Co2} time={data.time} Label={'CO2'} priviousData={my} mykey={'Co2'} image={CO2} bg={'rgb(182, 99, 99)'} />
            </div>

          </div>
        </div>
      </div>



    </>
  );
}
export default page;

/*
style={{ boxSizing:'border-box', position: 'relative',  display: 'inline-block', left:'50%', transform: 'translate(-50%, 0%)' }} 
  
*/