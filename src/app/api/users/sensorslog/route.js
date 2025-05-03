import mongoose from "mongoose";
import { Sensor } from "../../../../database/userSchema"
import { Sensortest } from "../../../../database/userSchema"
import { NextResponse } from "next/server";
const connectionStr = "mongodb+srv://lalilswani:KrGXqcaDbahGMmaL@cluster0.ygf21f6.mongodb.net/projectOne?retryWrites=true&w=majority&appName=Cluster0";
let all="mg"

export const GET = async (reqest) => {
   const  query  = await reqest.nextUrl.searchParams.get("purp");
    await mongoose.connect(connectionStr)
   
    if (query ===null) {
var data = await Sensor.find().skip(0).limit(1).sort({ _id: -1 });
    return NextResponse.json(data)
}
else if (query === "all") {
     var data = await Sensor.find();
     return NextResponse.json( data )
}


else if (query === "filterbydate") {

  
  const  query1  = await reqest.nextUrl.searchParams.get("s");
  const  query2  = await reqest.nextUrl.searchParams.get("e");
console.log(query1,query2)
//2025-05-01T09:38:00Z
var start = new Date(query1);
  start = new Date(start.getTime()+ 5.5 * 60 * 60 * 1000 );

var end = new Date(query2);
    end = new Date(end.getTime()+ 5.5 * 60 * 60 * 1000 );

  


await Sensor.find({  time: {$gte: start, $lte: end  } })
   
.then(records => { all=records})
  
.catch(error => {
     //Handle errors
   });




    return NextResponse.json(all)
}


}

export const POST = async (reqest) => {
    let payload = await reqest.json();
    if (payload.tkn !=="user") {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    const date = new Date();
    const now = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    payload.time = now
    
    
   let status = await mongoose.connect(connectionStr)
  status = new Sensor(payload)
     await status.save()
    return NextResponse.json(({ sucess: true, time : payload} ), { status: 202 } )
}



export const DELETE = async (reqest) => {
 
    
  await mongoose.connect(connectionStr)
  await Sensor.deleteMany()
return NextResponse.json(({ sucess: true }), { status: 202 })
}

  
