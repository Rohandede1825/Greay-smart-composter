
//http://192.168.43.126:3000/api/users/sensorslog?purp=all
//http://192.168.43.126:3000/api/users/sensorslog?purp=filterbydate&s=2025-05-01T17:40:00Z&e=2025-05-01T17:50:00Z
'use client'
import React, { useState, useEffect } from "react";
import profile from './profile.module.css'
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
import { useRouter } from 'next/navigation';
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import LineGraph from "../Cpmponents/LineGraph";


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

    const intervalId = setInterval(getdata, 10000);
    return () => clearInterval(intervalId);
  }, []);


  const onLogoff = () => {
    setLoading1(true);
    fetch(window.location.origin + '/api/users/logoff')
      .then((response) => response.json())

      .then(() => {
        router.push('./login')
      })

      .catch((error) => {
           // setLoading1(false);
    
      });


  }


  ////////////////////////////////////////////////////////////////////////////////////////////
  const fetchDataAndCreateExcel = async () => {
    setLoading(true);
 let a =new Date( nstartDate - 5.5 * 60 * 60 * 1000)
 let b=new Date( nendDate - 5.5 * 60 * 60 * 1000)

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
          <div className={profile.UserInfo} >
           
           
          
            <button className={profile.logoff} onClick={(e) => (onLogoff(e))} disabled={loading1}>{loading1 ? 'Logging Off' : ' Log Off '}</button>
            


            <h1 style={{ "color": "blue", 'textAlign': 'center' }}>Greya Smart Composter</h1>
            <h4 style={{ 'textAlign': 'center' }}>A Smart IoT-Enabled Device for On-Site Wet Waste Processing and Home Composting</h4>
          </div>



          <div className={profile.Info}>

          <div>

            Start Date:&nbsp;   <DateTimePicker
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
        format={"dd-MM-y h:mm:s a"}
      />&nbsp;&nbsp;

End Date:&nbsp; <DateTimePicker
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
        format={"dd-MM-y h:mm:s a"}
      />


&nbsp;&nbsp;
            <button onClick={fetchDataAndCreateExcel} disabled={loading}>{loading ? 'Generating Excel...' : 'Generate Excel'}</button>


</div>





            <br></br>
            Last Updates:- {new Date(new Date (data.time)- 5.5 * 60 * 60 * 1000).toLocaleString()}

            <div className={profile.Content}>
              <div className={profile.sensor1}><div className={profile.sensor}><Image src={humidity} className={profile.img} width={40} height={40} alt=""/><div className={profile.sensorName}>Humidity</div> <div className={profile.sensorValue}>{data.Humidity}</div> <div className={profile.sensorUnit}>%</div> </div></div>
              <div className={profile.sensor2}><div className={profile.sensor}><Image src={temperature} className={profile.img} width={40} height={40} alt=""/><div className={profile.sensorName}>Temperature</div><div className={profile.sensorValue}>{data.Temperature}</div><div className={profile.sensorUnit}>&#176;C</div></div></div>
              <div className={profile.sensor3}><div className={profile.sensor}><Image src={ph} className={profile.img} width={40} height={40} alt="" /><div className={profile.sensorName}>pH</div><div className={profile.sensorValue}>{data.Ph}</div><div className={profile.sensorUnit}>pH</div></div></div>
              <div className={profile.sensor4}><div className={profile.sensor}><Image src={H2S} className={profile.img} width={40} height={40} alt="" /><div className={profile.sensorName}>H2S</div><div className={profile.sensorValue}>{data.H2s}</div><div className={profile.sensorUnit}>ppm</div></div></div>
              <div className={profile.sensor5}><div className={profile.sensor}><Image src={NH3} className={profile.img} width={40} height={40} alt="" /><div className={profile.sensorName}>Ammonia</div><div className={profile.sensorValue}>{data.Ammonia} </div><div className={profile.sensorUnit}>ppm</div></div></div>
              <div className={profile.sensor6}><div className={profile.sensor}><Image src={CH4} className={profile.img} width={40} height={40} alt="" /><div className={profile.sensorName}>Methane</div><div className={profile.sensorValue}>{data.Methane}</div><div className={profile.sensorUnit}>ppm</div></div></div>
              <div className={profile.sensor7}><div className={profile.sensor}><Image src={CO2} className={profile.img} width={40} height={40} alt="" /><div className={profile.sensorName}>Co2    </div><div className={profile.sensorValue}>{data.Co2}</div><div className={profile.sensorUnit}>ppm</div></div></div>
            </div>


<div className={profile.Content}>

<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px'}}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.Humidity} time={data.time} Label={'Humidity'} priviousData={my} mykey={'Humidity'} /></div></div>
<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px' }}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.Temperature} time={data.time} Label={'Temperature'}  priviousData={my} mykey={'Temperature'}/></div></div>     
<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px' }}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.Ph} time={data.time} Label={'pH'}  priviousData={my} mykey={'Ph'} /></div></div>     
<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px' }}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.H2s} time={data.time} Label={'H2S'}  priviousData={my} mykey={'H2s'}/></div></div>
<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px' }}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.Ammonia} time={data.time} Label={'Ammonia'}  priviousData={my} mykey={'Ammonia'} /></div></div>
<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px' }}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.Methane} time={data.time} Label={'Methane'}  priviousData={my} mykey={'Methane'} /></div></div>     
<div  style={{  display:'inline-block', border: '1px, solid, black', margin:'5px' }}> <div style={{ position: 'relative', width: '100%', height: '150px', display:'inline-block'  }}><LineGraph data={data.Co2} time={data.time} Label={'CO2'}  priviousData={my} mykey={'Co2'}/></div></div>

            </div>


          </div>
        </div>







      </div>


<br></br>

     <h1> Under development </h1><br></br>
      <br></br>  



    </>
  );
}
export default page;
//https://api.thingspeak.com/channels/2901124/feeds.json?results=1
//<Image src={facebook} width={30} height={30}  alt="GFG logo imported from public directory"  />

// <div className={profile.sensor2}> <div className={profile.sensor}>><div className={profile.sensorName}>Temperature</div><div className={profile.sensorValue}>{data.Temperature}</div><div className={profile.sensorUnit}>C</div></div></div>
