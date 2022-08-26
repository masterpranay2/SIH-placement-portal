// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import notification from '../../assets/noNotifications.png';
import styles from './style.module.scss';
// import { addBreadCrumb, removeBreadCrumb } from '../../redux/reducers/breadCrumbReducer';

const notifications = [
  {
    date: '12/12/2019',
    name: 'John Doe',
    subject: 'Subject 1',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    link: 'https://www.google.com'
  },
  {
    date: '12/12/2019',
    name: 'John Doe',
    subject: 'Subject 2',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    link: 'https://www.google.com'
  },
  {
    date: '12/12/2019',
    name: 'John Doe',
    subject: 'Subject 3',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    link: 'https://www.google.com'
  }
]

const Notification = ({date, name, subject, bio, link, invert}) => {
  return (
    <div className={`${styles.notification} ${invert ? styles.invert : ''}`}>
      <small>{date}</small>
      <h2>{name}</h2>
      <p>Subject : {subject}</p>
      <p>{bio}</p>
      <p>Click to know more. <a href={link} className="underline highlight">Link</a></p>
    </div>
  );
}

const Notifications  = ({invert}) => {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addBreadCrumb({
  //     name: 'Notifications',
  //     url: '/student/notifications',
  //   }))

  //   // return () => {
  //   //   dispatch(removeBreadCrumb());
  //   // }
  // }, [])

  return (
    <div className={styles.notifications}>
      <h1>Notifications</h1>
      {
        notifications.length === 0 ? (
          <img src={notification} alt="no notifications" />
        ) : 
        (
          <>
          {notifications.map((notification, index) => {
            return <Notification key={index} {...notification} invert={invert}/>
          })}
          </>
        )
      }
    </div>
  );
}

export default Notifications;