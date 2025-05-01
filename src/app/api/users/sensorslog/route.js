import mongoose from "mongoose";
import { Sensor } from "../../../../database/userSchema"
import { NextResponse } from "next/server";
const connectionStr = "mongodb+srv://lalilswani:KrGXqcaDbahGMmaL@cluster0.ygf21f6.mongodb.net/projectOne?retryWrites=true&w=majority&appName=Cluster0";


export const GET = async (reqest) => {
   const  query  = await reqest.nextUrl.searchParams.get("purp");
    await mongoose.connect(connectionStr)
   
    if (query ===null) {
var data = await Sensor.find().skip(0).limit(1).sort({ _id: -1 });
    return NextResponse.json(data )
}
else if (query === "all") {
     var data = await Sensor.find();
     return NextResponse.json( data )
}


else if (query === "filterbydate") {
   console.log("filter")
  // var dat=await Sensor.find({
    //time: {
      //$gte: toLocaleString ("5/1/2025, 10:06:45 AM"), // Start date (inclusive)
    //  $lte: toLocaleString("5/1/2025, 11:06:45 AM")  // End date (inclusive)
  //  }
  //  });
    const date = new Date();
    const now = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
   //futureDate.toLocaleString()
    return NextResponse.json( now)
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
    return NextResponse.json(({ sucess: true }), { status: 202 })
}



export const DELETE = async (reqest) => {
 
    
  await mongoose.connect(connectionStr)
  await Sensor.deleteMany()
return NextResponse.json(({ sucess: true }), { status: 202 })
}

  
