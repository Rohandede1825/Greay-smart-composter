'use client'
import React, { useState, useEffect } from "react";
import profile from './profile.module.css'

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


  return (
    <>

      <div className={profile.bg}>
        <div className={profile.LeftsideBar}>
        </div>
        <div className={profile.Rightpanenl}>
          <div className={profile.UserInfo}>UserInfo 
          <button className={profile.logoff} onClick={(e) => (onLogoff(e))}>&nbsp; Log Off &nbsp;</button>
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


      </div>

   



    </>
  );
}
export default page;
//https://api.thingspeak.com/channels/2901124/feeds.json?results=1
//<Image src={facebook} width={30} height={30}  alt="GFG logo imported from public directory"  />
