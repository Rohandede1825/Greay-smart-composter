
//http://192.168.43.126:3000/api/users/sensorslog?purp=all
'use client'
import React, { useState, useEffect } from "react";
import profile from './profile.module.css'

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


import Image from "next/image";
import facebook from '../../../public/Image/facebook.png';
import google from '../../../public/Image/google.png';
import twitter from '../../../public/Image/twitter.png';
import hide from '../../../public/Image/hide.png';
import sw from '../../../public/Image/show.png'
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { useRouter } from 'next/navigation';



function page() {
  const [show, setShow] = useState(false)

  const [data, setData] = useState('')
  const [excelData, setExcelData] = useState('')
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const handleShow = () => {
    setShow(!show)
  }




 



  



  const getdata = async () => {
    try {
      const response = await fetch(window.location.origin+'/api/users/sensorslog');
      const result = await response.json();
      setData(result[0])
    } 
    
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

useEffect(() => {
    getdata();
    
  },[]
);


  useEffect(() => {
    


    const intervalId = setInterval(getdata, 10000);
    return () => clearInterval(intervalId);
  }, []);










  const onLogoff = () => {

    fetch(window.location.origin + '/api/users/logoff')
      .then((response) => response.json())

      .then(() => {
        router.push('./login')
      })

      .catch((error) => {
        console.error('Error:', error);
      });


  }












  const generateExcel = async() => {
  
    try {
      const response = await fetch(window.location.origin+'/api/users/sensorslog?purp=all');
      const result = await response.json();
      await setExcelData(result[0])
    } 
   catch (error) {
     // setExcelData('')
    console.error("Error fetching data:", error);
    }


 
   
    //setExcelData
    
    const data = [
      { Name: 'John', Age: 28, Country: 'USA' },
      { Name: 'Anna', Age: 22, Country: 'UK' },
    ];



    
    // Convert JSON to sheet
     const  worksheet =  XLSX.utils.json_to_sheet(excelData);
    const workbook =  XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Create Excel buffer
    const excelBuffer = await XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Create a Blob and download
    const blob = await new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
     saveAs(blob, 'example.xlsx');
  };

////////////////////////////////////////////////////////////////////////////////////////////
  const fetchDataAndCreateExcel = async () => {
    setLoading(true);

    try {
      // Example API call
      const res = await fetch(window.location.origin+'/api/users/sensorslog?purp=all');
      const data = await res.json();

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sensor_Data');

      // Generate buffer
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Save the file
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'users.xlsx');
    } catch (error) {
      console.error('Error creating Excel:', error);
    } finally {
      setLoading(false);
    }
  };

  





  return (
    <>

      <div className={profile.bg}>
        <div className={profile.LeftsideBar}>
        </div>
        <div className={profile.Rightpanenl}>
          <div className={profile.UserInfo} >
          <button className={profile.logoff} onClick={(e) => (onLogoff(e))}>&nbsp; Log Off &nbsp;</button>
<h1 style={{ "color":"blue" ,'textAlign':'center' }}>Greya Smart Composter</h1>
<h4  style={{ 'textAlign':'center'   }}>A Smart IoT-Enabled Device for On-Site Wet Waste Processing and Home Composting</h4>
         
           </div>
          <div className={profile.Content}>
            <div className={profile.sensor1}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />  </div> {data.Humidity}</div>
            <div className={profile.sensor2}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /></div>{data.Temperature}</div>
            <div className={profile.sensor3}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.Ph}</div>
            <div className={profile.sensor4}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.H2s}</div>
            <div className={profile.sensor5}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />{data.Ammonia} </div></div>
            <div className={profile.sensor6}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.Methane}</div>
            <div className={profile.sensor7}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.Co2}</div>

          </div>

        </div>

        <main style={{ padding: '2rem' }}>
      <h1>Download Excel File/Data</h1>
      <button onClick={fetchDataAndCreateExcel}> Generate Excel </button>
    </main>
     

     
   
     
     
      </div>

   



    </>
  );
}
export default page;
//https://api.thingspeak.com/channels/2901124/feeds.json?results=1
//<Image src={facebook} width={30} height={30}  alt="GFG logo imported from public directory"  />