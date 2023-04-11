// Here is the SignIn and SignUp Input, which contains animaiton.
import React from 'react'
import classNames from 'classnames'
export default function Input (props) {
  // console.log(props)
  const { type, placeholder, value } = props
  const [isFoucs, setIsFoucs] = React.useState(false);
  const handleFocus = () => { setIsFoucs(true) }
  const handleBlue = () => { value === '' ? setIsFoucs(false) : setIsFoucs(true) }
  return (
    <div className="txtb">
        <input type={type} className={classNames(
          { focus: isFoucs })} onFocus={handleFocus} onBlur={handleBlue} onChange={props.onChange}/>
        <span data-placeholder={placeholder} ></span>
    </div>
  )
}
