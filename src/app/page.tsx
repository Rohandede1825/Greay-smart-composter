'use client';
import Image from "next/image";
//import styles from "./page.module.css";
import React, { useState } from "react";
import  "bootstrap/dist/css/bootstrap.min.css"
export default function Home() {
  const [data, setData] = useState<number>(10);


  const [employee, setEmployee] = useState<{ name: string; salary?: number}>({name: '5'});
  const onchangevalue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setData(parseInt(e.target.value) );
}
  return (
    <div >
      {data}
      {employee.name}
      <button onClick={() => setEmployee({name: '6'})}>Change</button>
      <input  type="text" autoComplete="off" name="username" placeholder="ID" onChange={(e) => onchangevalue(e)}></input>
    <br></br>
    .......................
    <br></br>
 
    </div>
  );
}
