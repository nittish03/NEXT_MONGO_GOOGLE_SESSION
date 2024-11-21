import connectDb from "@/mongoDb/connectDb";
import * as dotenv from 'dotenv';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from '../../../../models/userModel'
dotenv.config();    
connectDb();
export async function POST(request:NextRequest){
try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody;
    console.log(reqBody);
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return NextResponse.json({error:"user already exists"},{status:400});
    }
    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)
    //save user in database
    const Newuser = new User({
        name:username,   
        email,
        password:hashedPassword
    })
    await Newuser.save();
return NextResponse.json({message:"User created successfully",
    success:true,
});
} catch (error:any) {
   return NextResponse.json({error:error.message},{status:500})
}
}