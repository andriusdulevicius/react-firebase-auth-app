import classes from './ProfileForm.module.css';
import { useState } from 'react';
import { sendData } from '../../utils/http';
import { useContext } from 'react';
import AuthContext from './../../store/auth-context';
import { useHistory } from 'react-router';

const ProfileForm = () => {
  const history = useHistory();
  const [updatedPassword, setUpdatedPassword] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (updatedPassword.length < 6) return console.log('password is too short');
    await sendData('https://identitytoolkit.googleapis.com/v1/accounts:update?key=', {
      idToken: token,
      password: updatedPassword,
      returnSecureToken: true,
    });
    history.push('/');
    return;
  };
  return (
    <form onSubmit={handlePasswordUpdate} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          onChange={(e) => setUpdatedPassword(e.target.value)}
          value={updatedPassword}
          type='password'
          id='new-password'
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
