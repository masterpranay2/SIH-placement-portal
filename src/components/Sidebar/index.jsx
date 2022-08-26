import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import profile from '../../assets/profile-icon.svg';
import notification from '../../assets/notifications.svg';
import upload from '../../assets/upload.svg';
import dashboard from '../../assets/dashboard.svg';

import { selectSideBar, resetSideBar } from '../../redux/reducers/sidebarReducer';
import { logout } from '../../redux/reducers/loginReducer';

import { useEffect } from 'react';

import axios from 'axios';

const linkData = [
  {
    name: 'Dashboard',
    url: '/institution/dashboard',
    img: dashboard
  },
  {
    name: 'Profile',
    url: '/institution/profile',
    img: profile
  },
  {
    name: 'Upload',
    url: '/institution/upload',
    img: upload
  }
]

const linkDataCorporates = [
  {
    name: 'Dashboard',
    url: '/corporate/dashboard',
    img: dashboard
  },
  {
    name: 'Profile',
    url: '/corporate/profile',
    img: profile
  },
  {
    name: 'Notifications',
    url: '/corporate/notifications',
    img: notification
  }
]

const linkDataGovernment = [
  {
    name: 'Dashboard',
    url: '/government/dashboard',
    img: dashboard
  },
  {
    name: 'Data',
    url: '/government/data',
    img: dashboard
  }
]

const Sidebar = () => {
  const activeIndex = useSelector(state => state.sidebar.selectedSideBarNum);
  const role = useSelector(state => state.login.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(resetSideBar());
  }, [dispatch]);

  let data=[];

  switch (role) {
    case 'institution':
      data = linkData;
      break;
    case 'corporate':
      data = linkDataCorporates;
      break;
    case 'government':
      data = linkDataGovernment;
      break;
    default:
      break;
  }

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
    <div className={styles.sidebar}>
      <main>
        {
          data.map((link, index) => {
            return (
              <Link 
              to={link.url} 
              key={index} 
              className={activeIndex === index ? styles.active : ''}
              onClick={() => dispatch(selectSideBar(index))}>
                <img src={link.img} alt={link.name} />
                <span>{link.name}</span>
              </Link>
            )
          })
        }

        <Link to="/" className={styles.logOut} onClick={handleLogoutClick}>
          <span>Log Out</span>
        </Link> 

      </main>
    </div>
  )
};

export default Sidebar;