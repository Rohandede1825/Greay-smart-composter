import mongoose from "mongoose";
import { Log } from "@/database/userSchema";
import { NextResponse } from "next/server";





export const GET = async () => {
   try{

    const response = NextResponse.json({ massage:"logout" , sucess : true ,status: 202 })
    
    response.cookies.set('token', '',   {httpOnly:true, expires: new Date(0)} );
     
   
      return response;
    }
    catch (error)
    {
        return  NextResponse.json({ massage:"logout failed " , sucess : false ,status: 404 });
    }
}
