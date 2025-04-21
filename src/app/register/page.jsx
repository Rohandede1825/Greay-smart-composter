'use client'
import React from 'react';
import { useState } from 'react';
import register from './register.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "bootstrap-icons/font/bootstrap-icons.css"
import Image from 'next/image';
import facebook from '../../../public/Image/facebook.png';
import google from '../../../public/Image/google.png';
import twitter from '../../../public/Image/twitter.png';
import hide from '../../../public/Image/hide.png';
import sw from '../../../public/Image/show.png'

function page() {
  const [data, setData] = useState({ name: '', userID: '', country:'', password: '', retypePassword:''})

  const [message, setMssage] = useState("")
  const [message1, setMssage1] = useState("")
  const router = useRouter();

 

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  const onchangevalue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onRegister = async (e) => {
console.log(data);
    if (!data.name || !data.userID ||  !data.country || !data.password   || !data.retypePassword) {
      setMssage("Please enter all fields")
      setMssage1("")
      return;

    }
    if (data.password !== data.retypePassword) {
      setMssage("Password and Retype Password should be same")
      setMssage1("")
      return;
    }
    
    setMssage("")
    setMssage1("Please wait while Login")
    


    try {
      let response = await fetch(window.location.origin +'/api/users/register', {
        method: 'POST',
        body: JSON.stringify(data)
      });
console.log(response.status)
      if (response.status === 200) {
        console.log("user ID already exist")
        setMssage("user ID already exist")
        setMssage1("")
      }

      else if (response.status === 202) {
        router.push('./login')
        response = await response.json();
      }

      else {
        setMssage1("")
        setMssage("please try again after some time")
      }



    }
    catch (error) {
      setMssage1("not Login")
    }
  }


  const preventCopyPaste = (e) => {
    e.preventDefault('')

  }


  return (
    <>
      <div className={register.box}>

        <label className={register.title}>User Registration</label>

        <label className={register.label3}>Username</label>
        <input className={register.textBox} id='2' type="text" autoComplete="off" name="name" placeholder="Type your Username" onChange={(e) => onchangevalue(e)}></input>

        <label className={register.label3}>User ID</label>
        <input className={register.textBox} id='2' type="text" autoComplete="off" name="userID" placeholder="Type your Username" onChange={(e) => onchangevalue(e)}></input>
        <br></br><br></br>

        <select className={register.textBox} name="country" id="cars"  defaultValue='' onChange={(e) => onchangevalue(e)}>
        <option value="undefine">-Select Country-</option>
          <option value="Country_1">Country_1</option>
          <option value="Country_2">Country_2</option>
          <option value="India" >India</option>
          <option value="Country_3">Country_3</option>
 </select>


        <label className={register.label3}>Password</label>
        <div className={register.password}>
          <input type={show ? "text" : "password"} onPaste={(e)=>{ preventCopyPaste(e)}} onCopy={(e) => { preventCopyPaste(e) }} id='3' autoComplete='off' name="password" placeholder="Type your Password" onChange={(e) => onchangevalue(e)} />
          <div>
            {show ? <Image className={register.passwordimage} onClick={() => (handleShow())} src={sw} width={30} height={30} alt="GFG logo imported from public directory" /> : <Image className={register.passwordimage} onClick={() => (handleShow())} src={hide} width={30} height={30} alt="GFG logo imported from public directory" />}
          </div>
        </div>

        <label className={register.label3}>Retype Password</label>
        <div className={register.password}>
          <input type="password" onPaste={(e)=>{ preventCopyPaste(e)}} onCopy={(e) => { preventCopyPaste(e) }} id='3' autoComplete='off' name="retypePassword" placeholder="Retype your Password" onChange={(e) => onchangevalue(e)} />
          <div>

          </div>
        </div>



        <br></br>

        <div className={register.alert}> {message}</div>
        <div className={register.alert1}> {message1}</div>

        <button className={register.button} onClick={(e) => (onRegister(e))}>&nbsp; Register &nbsp;</button> <br></br>

        <label className={register.lebel2}>Already have an account?</label> <Link className={register.link} href="/login">Log in</Link>
        <br></br>
        <hr className={register.hr}></hr>OR<hr className={register.hr}></hr>
        <br></br>
         <label className={register.label4}> Sign up using &nbsp;
         <Image className={register.label44} src={google} width={25} height={25} alt="LOGO" /> &nbsp;
</label>


      </div>
    </>
  );
}

export default page;










/*
 
'use client'
import React from 'react';
import login from './login.module.css'
 
 
 
import "bootstrap-icons/font/bootstrap-icons.css"
 
function page(props) {
 const onchangevalue = (e) => {
    console.log(e.target.id)
    console.log(e.target.value)
    console.log(e.target.name)
    console.log(e.target.placeholder)
    console.log(e.target.type)
 }
 
    return (
        <>
        <div className={login.background}>
         <h2 style={{ textAlign: 'center' }}>Login</h2> 
 
         <div className={login.nameText}> User name </div>
        <br></br>
         <i className="bi bi-person"></i>  <span></span>
         <input  className= {login.userInput } type="text" placeholder="Enter your username"  id='1'  autoComplete="off" name="name" onChange={(e) => onchangevalue(e)} />
         <br></br>
         <br></br>
         <div className={login.nameText}>Password </div>
         <br></br>
         <i className="bi bi-lock"></i>  
         <input  className= {login.userInput } type="text" placeholder="Enter your username" id='2'  autoComplete="off" name="name" onChange={(e) => onchangevalue(e)} />
         <br></br>
         <br></br>
         <button className={login.button} onClick={(e) => (onregister(e))}>&nbsp; Register &nbsp;</button> 
 
         </div>
        
    
        </>
    );
}
 
export default page;
 
*/