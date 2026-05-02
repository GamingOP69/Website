import React from 'react'

export default function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`btn btn-primary ${className}`.trim()}>
      {children}
    </button>
  )
}
