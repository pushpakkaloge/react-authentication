import { useContext, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const cntx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [Loading,setIsLoading] = useState(false);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const LoginHandler=(e)=>{
    e.preventDefault();
    setIsLoading(true);
    const myEmail = emailref.current.value;
    const myPassword = passwordref.current.value;

    let url="";

    if(isLogin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNfOiy9bZm0Jf5m6jciLwrchrL9TG7Y6U'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyDNfOiy9bZm0Jf5m6jciLwrchrL9TG7Y6U'
        
  }

  fetch(url,
    {
      method:'POST',
      body:JSON.stringify({
        email:myEmail,
        password:myPassword,
        returnSecureToken:true,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }
    ).then(
      res=>{
        setIsLoading(false);
        if(res.ok){
            // alert("Done !");
            return res.json().then((data)=>{
              // alert(data.error.message);
              cntx.login(data.idToken);
              history.replace('/home');
            })
        }else{
          return res.json().then((data)=>{
            // alert(data.error.message);
            cntx.logout();
          })
        }
      }
    )
    



}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input ref={emailref} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input ref={passwordref} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
{Loading && <button>Loading...</button> }
{   !Loading && <button onClick={LoginHandler} >{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
