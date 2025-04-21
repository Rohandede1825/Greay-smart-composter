
import mongoose from "mongoose";
import { Log } from "@/database/userSchema";
import { NextResponse } from "next/server";
import bcryprjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const connectionStr = "mongodb+srv://lalilswani:KrGXqcaDbahGMmaL@cluster0.ygf21f6.mongodb.net/projectOne?retryWrites=true&w=majority&appName=Cluster0";

export const POST = async (reqest) => {
  let payload = await reqest.json();

  if (!payload.userID || !payload.password) {
    //console.log('payload')
    return NextResponse.json("enter all data ", { status: 202 })
  }
  await mongoose.connect(connectionStr)
  //  let log = await Log.find();
  let log = await Log.findOne({ userID: payload.userID });

  if (!log) {
    console.log('password not valid')
    return NextResponse.json('user not found', { status: 200 })
  }

  const validpassword = await bcryprjs.compare(payload.password, log.HashPassword)

  if (!validpassword) {
    return NextResponse.json('password not valid', { status: 200 })

  }

  const tokenData = { username: log.userID, passward: log.HashPassword }
  const token = jwt.sign(tokenData, 'AnyJwtKey', { expiresIn: '1d' });
  const arrayToken = token.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  const response = NextResponse.json(({ sucess: true }), { status: 202 })
  response.cookies.set('token', token, { httpOnly: true });
  return response;


  //return NextResponse.json(({ sucess: true }), { status: 202 })
}

