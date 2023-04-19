// Here is the SignIn and SignUp Input, which contains animaiton.
import React from 'react'
import styles from './index.module.css'
// import classNames from 'classnames'
export default function Input (props) {
  // console.log(props)
  const { type, placeholder, value, id } = props
  const [isFoucs, setIsFoucs] = React.useState(false);
  const handleFocus = () => {
    setIsFoucs(true)
  }
  const handleBlue = () => { value === '' ? setIsFoucs(false) : setIsFoucs(true) }
  return (
  <div className={styles.txtb}>
        <input className={ isFoucs ? styles.focus : '' } id={id} type={type} onFocus={handleFocus} onBlur={handleBlue} onChange={props.onChange}/>
        <span data-placeholder={placeholder} ></span>
    </div>
  )
}
