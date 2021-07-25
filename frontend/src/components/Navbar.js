import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {
  const path = history.location.pathname;
  const isActive = ownPath => {
    return path === ownPath && 'red';
  };
  return (
    <nav className='nav flex-column'>
      <Link
        className='nav-link text-center'
        to='/'
        style={{ marginTop: '50px', color: isActive('/', path) }}>
        Analytics
      </Link>
      <Link
        className='nav-link text-center'
        to='/sendemails'
        style={{ color: isActive('/sendemails', path) }}>
        Send Emails
      </Link>
      <Link
        className='nav-link text-center'
        to='/myleads'
        style={{ color: isActive('/myleads', path) }}>
        My Leads
      </Link>
      <Link
        className='nav-link text-center'
        to='/myclients'
        style={{ color: isActive('/myclients', path) }}>
        My Clients / Projects
      </Link>
    </nav>
  );
};

export default withRouter(Navbar);
