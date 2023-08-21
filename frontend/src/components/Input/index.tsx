import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any
  name: string
  className?: string
}

export const Input: React.FC<InputProps> = ({register, className, name, ...rest}) => {
  return (
    <input className={`rounded px-4 outline-none ${className}`} {...register(name)} {...rest} />
  )
}
