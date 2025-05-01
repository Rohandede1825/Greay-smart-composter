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

else if (query === "filter") {
    var data = await Sensor.find().skip(0).limit(1).sort({ _id: -1 });
    data = await Sensor.find({
        time: {
          $gte: ISODate("5/1/2025, 10:33:08 AM"), // Start date (inclusive)
          $lte: ISODate("5/1/2025, 10:37:08 AM")  // End date (inclusive)
        }
      })
    
    
    return NextResponse.json( data )
}


}

export const POST = async (reqest) => {
    let payload = await reqest.json();
    if (payload.tkn !=="user") {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    const now = new Date();
    now.setHours(now.getHours() + 5);
    now.setMinutes(now.getMinutes() + 30);
    payload.time = now.toLocaleString()
    
    
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

  
