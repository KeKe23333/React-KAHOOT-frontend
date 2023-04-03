import React from 'react'
import './index.css'
import classNames from 'classnames'
export default function Login () {
  const [showSignUpPanel, setShowSignUpPanel] = React.useState(false);
  const [isFoucs, setIsFoucs] = React.useState(false);
  const changePanel = () => {
    setShowSignUpPanel(!showSignUpPanel)
  }
  const handleFocus = () => {
    setIsFoucs(!isFoucs)
  }
  return (
  <div className='login-body'>
    <span className='web-logo'>BigBain Technology </span>
    <div className={
        classNames({
          container: true,
          'right-panel-active': showSignUpPanel
        })} id="login-box">

        <div className="form-container sign-up-container">
            <form>
                <h1>Register</h1>
                <div className="txtb">
                    <input type="text" className={classNames(
                      { focus: isFoucs })} onFocus={handleFocus} onBlur={handleFocus}/>
                    <span data-placeholder="Useranme" ></span>
                </div>
                <div className="txtb">
                    <input type="email"/>
                    <span data-placeholder="Email" ></span>
                </div>
                <div className="txtb">
                    <input type="password"/>
                    <span data-placeholder="Password" ></span>
                </div>
                <div className="txtb">
                    <input type="password"/>
                    <span data-placeholder="Confirm Password" ></span>
                </div>
                <button>Register</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign In</h1>
                <div className="txtb">
                    <input type="email"/>
                    <span data-placeholder="Email" ></span>
                </div>
                <div className="txtb">
                    <input type="password"/>
                    <span data-placeholder="Password"></span>
                </div>
                <a href="#">Forget password?</a>
                <button>SING IN</button>
            </form>
        </div>

        <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Alread have an Account?</h1>
                        <p>Please use your account to Sign in</p>
                        <button className="ghost" id="signIn" onClick={changePanel} >Sign in</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>No Account?</h1>
                        <p>Sign up to join BigBrain now and start the journey with us</p>
                        <button className="ghost" id="signUp" onClick={changePanel}>Register</button>
                    </div>
                </div>
        </div>
    </div>
  </div>
  )
}
