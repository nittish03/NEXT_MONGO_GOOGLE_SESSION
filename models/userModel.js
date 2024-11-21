import mongoose, { Document, Schema } from "mongoose";
import  bcryptjs from "bcryptjs";
import JWT from 'jsonwebtoken'
import cookie from "cookie";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password length should be 6 character long"],
  },
});


const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;

