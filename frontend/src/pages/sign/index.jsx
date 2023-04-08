import React, { useEffect } from 'react'
import './index.css'
import classNames from 'classnames'
import Input from '../../components/input';
import fetchRequest from '../../components/fetchRequest';
import { useNavigate } from 'react-router-dom';

export default function Login ({ onSuccess }) {
  const [showSignUpPanel, setShowSignUpPanel] = React.useState(false);
  const changePanel = () => { setShowSignUpPanel(!showSignUpPanel) }
  const [signInEmail, setSignInEmail] = React.useState('');
  const [signInPassword, setSignInPassword] = React.useState('');
  const [signUpUsername, setSignUpUsername] = React.useState('');
  const [signUpEmail, setSignUpEmail] = React.useState('');
  const [signUpPassword, setSignUpPassword] = React.useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = React.useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  // check if user is alread login
  useEffect(() => {
    if (token) { navigate('/Dashboard') }
  }, [])
  const handleSignIn = (event) => {
    event.preventDefault();
    console.log('we have input')
    console.log(signInEmail)
  }
  const handleRegister = (event) => {
    event.preventDefault();
    const payload = {
      email: signUpEmail,
      password: signUpPassword,
      name: signUpUsername,
    }
    fetchRequest('auth/register', 'POST', payload);
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
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <Input type="name" placeholder="Useranme" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
                <Input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm Password" value={signUpConfirmPassword} onChange={(e) => setSignUpConfirmPassword(e.target.value)} />
                <button>Register</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
                <h1>Sign In</h1>
                <Input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
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
