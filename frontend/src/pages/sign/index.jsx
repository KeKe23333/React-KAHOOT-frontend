import React, { useEffect } from 'react'
import Input from '../../components/Input'
import fetchRequest from '../../utlis';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css'
import Notification from '../../components/Notification';

export default function Login () {
  const [showSignUpPanel, setShowSignUpPanel] = React.useState(false);
  const changePanel = () => {
    setShowSignUpPanel(!showSignUpPanel)
  }
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
    if (token) { navigate('/main') }
  }, [])
  const handleSignIn = (event) => {
    event.preventDefault();
    console.log('we have input')
    console.log(signInEmail)
    if (signInEmail && signInPassword) {
      const payload = {
        email: signInEmail,
        password: signInPassword,
      }
      fetchRequest('auth/login', 'POST', payload).then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          navigate('/main')
        } else { alert('Wrong email or password') }
      });
    }
  }
  const handleRegister = (event) => {
    event.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      Notification({ message: 'Two password not match!', type: 'error' })
    } else if (signUpPassword === signUpConfirmPassword && signUpEmail && signUpPassword && signUpUsername) {
      const payload = {
        email: signUpEmail,
        password: signUpPassword,
        name: signUpUsername,
      }
      fetchRequest('auth/register', 'POST', payload).then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          navigate('/main')
        } else {
          alert('Oop! Email address already registered')
        }
      });
    }
  }
  return (
  <div className={styles.loginPage}>
  <div className={styles.loginBody}>
    <span className={styles.webLogo}>BigBain Technology </span>
    <div className={!showSignUpPanel ? styles.container : [styles.container, styles.rightPanelActive].join(' ')} id="login-box">
        <div className={[styles.formContainer, styles.signUpContainer].join(' ')}>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <Input type="name" placeholder="Useranme" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
                <Input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm Password" value={signUpConfirmPassword} onChange={(e) => setSignUpConfirmPassword(e.target.value)} />
                <button>REGISTER</button>
            </form>
        </div>

        <div className={[styles.formContainer, styles.signInContainer].join(' ')}>
            <form onSubmit={handleSignIn}>
                <h1>Sign In</h1>
                <Input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
                <a className={styles.forgetPass} href=''>Forget password?</a>
                <button>SIGN IN</button>
            </form>
        </div>

        <div className={styles.overlayContainer}>
                <div className={styles.overlay}>
                    <div className={[styles.overlayPanel, styles.overlayLeft].join(' ')}>
                        <h1>Alread have an Account?</h1>
                        <p>Please use your account to Sign in</p>
                        <button className={styles.ghost} id="signIn" onClick={changePanel} >Sign in</button>
                    </div>
                    <div className={[styles.overlayPanel, styles.overlayRight].join(' ')}>
                        <h1>No Account?</h1>
                        <p>Sign up to join BigBrain now and start the journey with us</p>
                        <button className={styles.ghost} id="signUp" onClick={changePanel}>Register</button>
                    </div>
                </div>
        </div>
    </div>
  </div>
  </div>
  )
}
