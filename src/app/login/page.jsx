
'use client'
import React from 'react';
import { useState } from 'react';
import login from './login.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "bootstrap-icons/font/bootstrap-icons.css"
import jwt from 'jsonwebtoken'
import Image from 'next/image';
import facebook from '../../../public/Image/facebook.png';
import google from '../../../public/Image/google.png';
import twitter from '../../../public/Image/twitter.png';
import hide from '../../../public/Image/hide.png';
import sw from '../../../public/Image/show.png'
function page () {
    const [data, setData] = useState({  userID: '', password: '' })

    const [message, setMssage] = useState("")
    const [message1, setMssage1] = useState("")
    const router = useRouter();

    const onchangevalue = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

 const [show,setShow]=useState(false)
   
 const handleShow=()=>{
        setShow(!show)
    }


    const  onLogin = async (e) => {
      
        if ( ! data.userID  || ! data.password ){ 
            setMssage("Please enter all fields") 
            setMssage1("") 
            return;
            
        }
        setMssage("") 
        setMssage1("Please wait while Login") 
        try{
            let response = await fetch(window.location.origin +'/api/users/login',{
                method : 'POST',
              body: JSON.stringify(data)
            
            });
           
            if (response.status===202){
                router.push('./dashboard')
                response = await response.json();
             
            }
            else{
                setMssage1("") 
                setMssage("Invalid User ID or password")  
              
            }
         
           
       
        }
        catch(error)
        {
            setMssage1("not Login") 
        }
      
        
      
    
 
    } 

    return (
        <>
            <div className={login.box}>
                
                <label className={login.title}>Login</label>
                
                <label className={login.label3}>User ID</label>

                <i className="bi bi-person"></i> <span></span>
                <input className={login.textBox} id='2' type="text" autoComplete="off" name="userID" placeholder="Type your User ID" onChange={(e) => onchangevalue(e)}></input>
                <label className={login.label3}>Password</label>
            
                
            

                <i className="bi bi-lock"></i>  <div className={login.password}>
          <input type={show?"text":"password"}   id='3' autoComplete='off' name="password" placeholder="Type your Password" onChange={(e) => onchangevalue(e)}/> 
         <div className={login.passwordimagediv}>
          {show? <Image className={login.passwordimage} onClick={()=> (handleShow())}src={sw} width={30} height={30}  alt="GFG logo imported from public directory"  />:<Image className={login.passwordimage}onClick={()=> (handleShow())}src={hide} width={30} height={30}  alt="GFG logo imported from public directory"  />} 
          </div>
      </div>


                <br></br>
                <div className={login.forgotPassword}>Forgot password?</div>
                <div  className={login.alert}> {message}</div>
                <div  className={login.alert1}> {message1}</div>
                <button className={login.button} onClick={(e) => (onLogin(e))}>&nbsp; Login &nbsp;</button> <br></br>
               
               <label className={login.lebel2}>Don't have an account?</label> <Link className={login.link} href="/register"> Sign Up</Link>
           <br></br>
              
               
                <div>or Sign up using </div>
                <Image src={facebook} width={30} height={30}  alt="GFG logo imported from public directory"  />
                &nbsp; &nbsp;
                <Image src={google} width={30} height={30}  alt="GFG logo imported from public directory"  />
                &nbsp; &nbsp;
                <Image src={twitter} width={30} height={30}  alt="GFG logo imported from public directory"  />
            </div>
        </>
    );
}

export default page;









