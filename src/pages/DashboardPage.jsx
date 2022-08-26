import BreadCrumbs from '../components/Breadcrumbs';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import { CorporatesProfile, InstitutionProfile } from '../components/Profile';
import { Routes, Route } from 'react-router-dom';
import Notification from '../components/Notifications';
import Upload from '../components/Upload';
import Dashboard from '../components/Dashboard';
import { useSelector } from 'react-redux';
import AllData from '../AllData';

const DashboardPage = () => {
  const role = useSelector(state => state.login.role);
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--clr-sec)',
      }}
    >
      <NavBar />
      <Sidebar />
      <div
        style={{
          padding: '2em',
          paddingTop: '8em',
          paddingLeft: '16em',
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
        }}
      >
        <BreadCrumbs invert />

        {role === 'institution' ? (
          <Routes>
            <Route path="/profile" element={<InstitutionProfile />} />
            <Route path="/notifications" element={<Notification invert />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        ) : (
          ''
        )}

        {role === 'corporate' ? (
          <Routes>
            <Route path="/profile" element={<CorporatesProfile />} />
            <Route path="/notifications" element={<Notification invert />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        ) : (
          ''
        )}

        {role === 'government' ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data" element={<AllData />} />
          </Routes>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
