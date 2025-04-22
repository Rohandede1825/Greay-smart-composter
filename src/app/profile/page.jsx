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
  const [data, setData] = useState([{ field1: '0.0', field2: '0.0', field3: '0.0', field4: '0.0', field5: '0.0', field6: '0.0', field7: '0.0' }])
  const router = useRouter();
  const handleShow = () => {
    setShow(!show)
  }

  const getdata = (() => {
    fetch('https://api.thingspeak.com/channels/2901124/feeds.json?results=1')
      .then((response) => response.json())

      .then((mydata) => {
        setData(mydata.feeds[0])
        // console.log(data.feeds[0]);
        console.log(data.field2);
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
          <div className={profile.UserInfo}>UserInfo  </div>
          <div className={profile.Content}>
            <div className={profile.sensor1}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />  </div>{data.field1}</div>
            <div className={profile.sensor2}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /></div>{data.field2}</div>
            <div className={profile.sensor3}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.field3}</div>
            <div className={profile.sensor4}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> </div>{data.field4}</div>
            <div className={profile.sensor5}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />{data.field5} </div></div>
            <div className={profile.sensor6}><div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" /> {data.field6}</div></div>
            <div className={profile.sensor7}> <div style={{ maxWidth: '30px' }}><Image src={facebook} className={profile.img} width={30} height={30} alt="GFG logo imported from public directory" />{data.field7} </div></div>

          </div>

        </div>


      </div>

      <button className={profile.logoff} onClick={(e) => (onLogoff(e))}>&nbsp; Log Off &nbsp;</button>



    </>
  );
}
export default page;
//https://api.thingspeak.com/channels/2901124/feeds.json?results=1
//<Image src={facebook} width={30} height={30}  alt="GFG logo imported from public directory"  />
