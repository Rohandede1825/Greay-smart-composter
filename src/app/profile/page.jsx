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
  const [myinterval, setMyinterval] = useState(false)
  const [data, setData] = useState({ "sensor": [],"time": ""})
  const router = useRouter();
  const handleShow = () => {
    setShow(!show)
  }

  useEffect(() => {
    //Implementing the setInterval method..
    const interval = setInterval(() => {
      getdata();
      setMyinterval(!myinterval)
      // console.log('Interval is running...')
    }, 5000);
    //Clearing the interval0
    return () => clearInterval(interval);
  }, [myinterval]);




 const getdata = (() => {
    //api/users/sensorslog
    
    fetch(window.location.origin+'/api/users/sensorslog')
      .then((response) => response.json())

      .then((mydata) => {
       setData(mydata.result[0])
       
        console.log(data.sensor);
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  })

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


  const generateExcel = () => {
    // Example JSON data
    var exceldata = [
      { Sr: '', S1: data.sensor[0], S2: data.sensor[1] ,S3: data.sensor[3],  S4: data.sensor[4], S5: data.sensor[5], S6: data.sensor[6],S7:  data.sensor[6]  }
     
    ];
 //exceldata = data.sensor
    // Convert JSON to sheet
  

    const worksheet = XLSX.utils.json_to_sheet(exceldata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Create Excel buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

// Create a Blob and download
const blob = new Blob([excelBuffer], {
  type:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});



  









  

   
    
    saveAs(blob, 'SensorsData.xlsx');




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
            <div className={profile.sensor1}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />  </div>{data.sensor[0]}</div>
            <div className={profile.sensor2}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /></div>{data.sensor[1]}</div>
            <div className={profile.sensor3}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.sensor[2]}</div>
            <div className={profile.sensor4}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.sensor[3]}</div>
            <div className={profile.sensor5}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />{data.sensor[4]} </div></div>
            <div className={profile.sensor6}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> {data.sensor[5]}</div></div>
            <div className={profile.sensor7}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />{data.sensor[6]} </div></div>

          </div>

        </div>

        <main style={{ padding: '2rem' }}>
      <h1>Download Excel File</h1>
      <button onClick={generateExcel}>Generate Excel</button>
    </main>
      </div>

   



    </>
  );
}
export default page;
//https://api.thingspeak.com/channels/2901124/feeds.json?results=1
//<Image src={facebook} width={30} height={30}  alt="GFG logo imported from public directory"  />