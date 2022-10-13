import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import List from './List';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const ctx = useContext(AuthContext);

  return (
    <section className={classes.profile}>
      <h1>Contacts</h1>
      <List />
    </section>
  );
};

export default UserProfile;
