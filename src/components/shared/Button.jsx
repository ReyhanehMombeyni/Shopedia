import React from 'react'

const Button = ({type, text}) => {
  return (
    <button type={type} className="px-10 py-3 text-white rounded-3xl bg-[#F47458]">{text}</button>
  )
}

export default Button