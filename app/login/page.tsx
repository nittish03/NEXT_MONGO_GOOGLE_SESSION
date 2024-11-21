'use client'
import React,{FormEvent, useState} from 'react'
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { redirect, useRouter } from 'next/navigation'
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast';


const LoginPage = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);


  const handleClick = () => {
    
    const loading = toast.loading("Logging in");
    try {
        signIn("google",{callbackUrl: '/'});
        toast.dismiss(loading);
    } catch (error) {
        toast.dismiss(loading);
        console.log(error);
        toast.error("Failed to Log in, please try again")
    }
  }

  const changeShowStatus = () => {
      setShowPass(!showPass);
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {


    e.preventDefault();
    const loading = toast.loading("Signing in")
    if (email === '' || password === '') {
        setError("Fill all fields!")
        return;
    }
    if (!email.includes("@") || email.length < 5 || !email.includes(".") || email.length > 100) {
        setError("Invalid email, must include @ and domain part!")
        return;
    }
    console.log("email" + email);
    console.log("password" + email);
    try {
      const response =  await signIn(
            "credentials", {
                email,
                password,
                callbackUrl: "/",
                redirect: true
            }
        );
        if(response){
            toast.dismiss(loading)
            toast.success("Signed in successfully");
        }else{
          toast.dismiss(loading);
            toast.error("Failed to sign in, please try again!")   
        }
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Failed to sign in");
        console.log(error);
    }
    return;
}

  return (
    <div className='h-fit  overflow-hidden text-white w-screen flex justify-center items-center'>
      <div className='custom-shadow w-[320px] md:w-[450px] py-5 h-fit mt-4  border rounded-lg flex flex-col items-center justify-around font-sans font-light'>
          <h1 className='text-2xl tracking-wide'>{"SIGN IN"}</h1>
          <h3 className='text-sm mb-5'>to continue</h3>
          <form onSubmit={handleSubmit} className='w-[80%] flex flex-col items-center justify-center gap-8'>

              <CustomInput type='email' placeholder='email' onChange={(e) => {
                  setError('');
                  setEmail(e.target.value)
              }} value={email} />
              <CustomInput isPassVisible={showPass} onClick={changeShowStatus} type={showPass ? "text" : 'password'} placeholder='Password' onChange={(e) => {
                  setError('');
                  setPassword(e.target.value)
              }} value={password} />

              {
                  error && <p className='w-full text-start text-sm text-red-500 my-[-12px]'>{error}</p>
              }
              <CustomButton title={"SIGN IN"} type='submit' />
              <div className='w-full'>
                  <p className='w-full text-sm flex justify-center items-center'>{"Don't have an account ?"}<span onClick={() => {
                      redirect("/signup")
                  }} className='text-green-300 ml-1 cursor-pointer'>{"sign up"}</span></p>
              </div>

          </form>
          <div className='w-[90%] h-[1px] bg-white my-2'></div>
          <div className='flex flex-col justify-center items-center gap-3'>
              <div className='w-full text-center'>or</div>
              <div className='w-full flex justify-center items-center'>
                  <div className='cursor-pointer size-8 rounded-full flex justify-center items-center bg-white'>
                      <FcGoogle onClick={handleClick} className='size-6' />
                  </div>
              </div>
          </div>
      </div>
      </div>
  )
}

export default LoginPage