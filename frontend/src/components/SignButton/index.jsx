import React from 'react'

export default function SignButton (props) {
  return (
  <button
    style={{
      borderRadius: '20px',
      border: '1px solid #ff4b2b',
      background: '#ff4b2b',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '12px 45px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'transform 80ms ease-in',
      cursor: 'pointer',
      '&:active': {
        border: '1px solid green'
      },
      '&focus': {
        outline: 'none',
      },
    }}
    {...props}
  >{props.children}</button>
  )
}
