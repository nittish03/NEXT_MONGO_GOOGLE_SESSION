import React from 'react'
import { HTMLInputTypeAttribute } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { ChangeEvent } from 'react';

interface InputProps {
    type?: HTMLInputTypeAttribute;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isPassVisible?: boolean;
    onClick?: () => void;
}

const CustomInput = ({type, placeholder, value, onChange, isPassVisible, onClick}: InputProps) => {
    return (
        <div className="relative w-full">
            <input type={type} onChange={onChange} className="w-full pb-2 bg-inherit border-white focus:outline-none peer" />
            <div className={`pointer-events-none ${value !== "" && "-translate-y-[18px] scale-90"} absolute bottom-3 left-0 peer-focus:scale-90 peer-focus:-translate-y-[18px] transition-all duration-500 ease-out`}>
                {placeholder}
            </div>
            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-white'>
            </div>
            {
            onClick && <div className='size-3 absolute top-1 right-2'>
                {
                    isPassVisible ? (
                        <IoMdEye className='size-[20px]' onClick={onClick}/>
                    ) : (
                        <IoMdEyeOff className='size-[20px]' onClick={onClick}/>
                    )
                }
            </div>
            }
        </div>
    )
}

export default CustomInput