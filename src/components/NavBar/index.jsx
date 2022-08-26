import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './style.module.scss';
import Button from '../Button';

import logo_small from '../../assets/logo_small.png';
import hamburger from '../../assets/hamburger.png';
import cross from '../../assets/cross.png';
import notifications from '../../assets/notifications.svg';

import {
  toggleNavMobile,
  closeNavMobile,
} from '../../redux/reducers/navReducer';
import {
  addBreadCrumb,
  clearBreadCrumb,
} from '../../redux/reducers/breadCrumbReducer';
import { logout } from '../../redux/reducers/loginReducer';
import axios from 'axios';

const NavBar = () => {
  const isHamburgerOpen = useSelector((state) => state.nav.isNavMobileOpen);
  const isLogin = useSelector((state) => state.login.isLoggedIn);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close the mobile nav if window is resized
  useEffect(() => {
    function handleResize() {
      if (isHamburgerOpen) {
        dispatch(closeNavMobile());
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // add the register breadcrumb
  const addRegisterBreadCrumb = () => {
    dispatch(clearBreadCrumb());
    dispatch(
      addBreadCrumb({
        name: 'Home',
        url: '/',
      })
    );
    dispatch(
      addBreadCrumb({
        name: 'Register',
        url: '/auth/register',
      })
    );
  };

  // add the login breadcrumb
  const addLoginBreadCrumb = () => {
    dispatch(clearBreadCrumb());
    dispatch(
      addBreadCrumb({
        name: 'Home',
        url: '/',
      })
    );
    dispatch(
      addBreadCrumb({
        name: 'Login',
        url: '/auth/login',
      })
    );
  };

  const replaceBreadCrumpWithHome = () => {
    dispatch(clearBreadCrumb());
    dispatch(
      addBreadCrumb({
        name: 'Home',
        url: '/',
      })
    );
  };

  // logout on click
  const handleLogoutClick = async () => {
    // call api to logout
    const config = {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    };
    try {
      await axios.post(`http://localhost:5000/api/${role}/logout`, {}, config);
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav>
      {/* Brand name with Brand Logo */}
      <header>
        <Link to="/" onClick={replaceBreadCrumpWithHome}>
          <div className={styles.logo_wrapper}>
            <img src={logo_small} alt="logo" />
            <h1>
              <span className="orange">AICTE</span>&nbsp;Placement Portal
            </h1>
          </div>
        </Link>

        {!isLogin && (
          <div className={styles.button_wrapper}>
            <Button
              text={<Link to="/auth/login">Login</Link>}
              outline
              animate
              onclick={addLoginBreadCrumb}
            />
            <Button
              text={<Link to="/auth/register">Register</Link>}
              animate
              onclick={addRegisterBreadCrumb}
            />
          </div>
        )}

        {!isLogin && (
          <div className={styles.hamburger}>
            <img
              src={isHamburgerOpen ? cross : hamburger}
              alt="hamburger"
              onClick={() => dispatch(toggleNavMobile())}
            />
          </div>
        )}

        {isLogin && role === 'student' && (
          <>
            <img
              className={styles.notificationIcon}
              src={notifications}
              alt="notifications"
              onClick={() => navigate(`/${role}/notifications`)}
            />
            <Button text="Logout" notLink outline invertOnHover onclick={handleLogoutClick}/>
          </>
        )}
      </header>

      {!isLogin &&
        (isHamburgerOpen ? (
          <div className={styles.navbar_mobile}>
            <Button
              text={<Link to="/auth/login">Login</Link>}
              outline
              animate
              onclick={addLoginBreadCrumb}
            />
            <Button
              text={<Link to="/auth/register">Register</Link>}
              animate
              onclick={addRegisterBreadCrumb}
            />
          </div>
        ) : (
          ''
        ))}
    </nav>
  );
};

export default NavBar;
