import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const handleLogout = () => {
    console.log('logging off');
    authCtx.logout();
    history.push('/auth');
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <span>Logged in as: {authCtx.loggedInData.displayName || authCtx.loggedInData.email}</span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
