import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { sendData } from './../../utils/http';
import { useHistory } from 'react-router';

const AuthForm = (props) => {
  const history = useHistory();
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
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      console.log('login action');
    }
    // sukurti vartotoja
    if (!isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
      console.log('sign up action');
    }

    const response = await sendData(url, {
      email,
      password,
      returnSecureToken: true,
    });
    if (response) {
      const token = response.data.idToken;
      authCtx.login(token, email);
      history.push('/');
    }
    // sekmingo atsakymo vieta, kur ivykdom login metoda paduodant tokena

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
