import mongoose from "mongoose";
import { Sensor } from "../../../../database/userSchema"
import { NextResponse } from "next/server";
const connectionStr = "mongodb+srv://lalilswani:KrGXqcaDbahGMmaL@cluster0.ygf21f6.mongodb.net/projectOne?retryWrites=true&w=majority&appName=Cluster0";


export const GET = async () => {
    await mongoose.connect(connectionStr)
   // const data = await Sensor.find();
//db.collection.find().skip(db.collection.count() - N)
const data = await Sensor.find().skip(0).limit(1).sort({ _id: -1 });
    return NextResponse.json({ result: data })
}


export const POST = async (reqest) => {
    let payload = await reqest.json();
    if (payload.tkn !=="user") {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    const now = new Date();
    payload.time = now.toLocaleString()
    console.log (payload)
    
   let status = await mongoose.connect(connectionStr)
  status = new Sensor(payload)
     await status.save()
    return NextResponse.json(({ sucess: true }), { status: 202 })
}

