import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
import Notifications from '../components/Notifications';
import BreadCrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';

import styles from './StudentPage.module.scss';

import { Routes, Route } from 'react-router-dom';
import Error from '../components/Error';

const StudentPage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.content}>
        <BreadCrumbs />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Error error={404} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage;
