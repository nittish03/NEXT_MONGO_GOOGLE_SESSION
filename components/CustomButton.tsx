import React from 'react'

interface ButtonProps {
    title: string;
    type?: 'submit';
    onClick?: () => void;
    variant?: 'default' | 'disabled' | 'gray' //Add more variants as you like
}

const CustomButton = ({title, type, onClick, variant}: ButtonProps) => {

  const classes = {
    default: "w-full h-fit bg-custom-neon text-black font-koho font-medium rounded-md py-1.5",
    gray: "w-fit px-6 py-2 bg-gray-500 rounded-md hover:bg-gray-600 transition-all duration-500 ease-Out text-nowrap text-base ",
    disabled: "w-full h-fit bg-gray-500 text-gray-200 rounded-md py-1 pointer-events-none"
  }

  return (
    <button onClick={onClick} className={variant ? classes[variant] : classes.default} type={type}>{title}</button>
  )
}

export default CustomButton