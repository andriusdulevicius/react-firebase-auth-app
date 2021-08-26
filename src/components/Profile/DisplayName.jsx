import classes from './ProfileForm.module.css';
import { useState } from 'react';
import { sendData } from '../../utils/http';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';

const DisplayNameForm = () => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const handleDisplayNameUpdate = async (e) => {
    e.preventDefault();
    if (displayName.length < 5) return console.log('display name must be at least 5 chars ');
    await sendData('https://identitytoolkit.googleapis.com/v1/accounts:update?key=', {
      idToken: token,
      displayName,
      photoUrl: '',
      deleteAttribute: 'PHOTO_URL',
      returnSecureToken: true,
    });
    history.push('/');
  };
  return (
    <form onSubmit={handleDisplayNameUpdate} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-name'>Display name</label>
        <input onChange={(e) => setDisplayName(e.target.value)} value={displayName} type='text' id='new-name' />
      </div>
      <div className={classes.action}>
        <button>Set new name</button>
      </div>
    </form>
  );
};

export default DisplayNameForm;
