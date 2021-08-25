import axios from 'axios';
import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { apiKey } from './../../config';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let url;
    // prijungti esama vartotoja
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
      console.log('login action');
    }
    // sukurti vartotoja
    if (!isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
      console.log('sign up action');
      console.log('sending form', {
        email,
        password,
        returnSecureToken: true,
      });
      // galima validacija,  pvz passwordai ar sutampa ir t.t.
    }

    try {
      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      // sekmingo atsakymo vieta, kur ivykdom login metoda paduodant tokena
      authCtx.login(response.data.idToken);
    } catch (error) {
      console.log(error.response.data.error.message);
      alert('Error: ' + error.response.data.error.message);
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            id='password'
            minLength='6'
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? <button disabled>Loading...</button> : <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
