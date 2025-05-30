
//http://192.168.43.126:3000/api/users/sensorslog?purp=filterbydate&s=2025-05-28T09:38:00Z&e=2025-06-30T09:38:00Z
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
  var  query1  = await reqest.nextUrl.searchParams.get("s");
  var  query2  = await reqest.nextUrl.searchParams.get("e");



//2025-05-30T07:55:00Z

 query1 = new Date(query1);
 query2 = new Date(query2);
 console.log(query1, "............... ", query2);


all = await Sensor.find({ createdAt: { $gte: query1, $lte: query2 } });


  return NextResponse.json(all)
}



else if (query === "20") {
var data = await Sensor.find().sort({ _id: -1 }).limit(15);
  data = data.reverse();
//console.log(data)
return NextResponse.json(data)
}




}

export const POST = async (reqest) => {
    let payload = await reqest.json();
    if (payload.tkn !=="user") {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    var  date = new Date();
    const now = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

   payload.time = date;
    
    
   let status = await mongoose.connect(connectionStr)
  status = new Sensor(payload)
    await status.save()
    return NextResponse.json(({ sucess: true} ), { status: 202 } )
}



export const DELETE = async (reqest) => {
 var  payload = (await reqest.json()).other;
 
 if (payload==="confirm") {
   console.log(payload)
   await mongoose.connect(connectionStr)
  await Sensor.deleteMany()
  }
return NextResponse.json(({ sucess: true }), { status: 202 })
}

  
