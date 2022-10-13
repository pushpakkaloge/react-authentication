import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const cntx = useContext(AuthContext);
  const isLoggedIn = cntx.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to='/profile'>
        <div className={classes.logo}>Contacts App</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/'>Login</Link>
          </li>}
          {/* {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>} */}
          {isLoggedIn && <li>
            <button onClick={cntx.logout} >Logout</button>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
