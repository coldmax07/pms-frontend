import { useContext, useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext.jsx';
import { UserContext } from '../context/UserContext.jsx';

const Layout = () => {
  const { t, lang, setLang } = useContext(LanguageContext);
  const { user, setUser } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setUser({ role: 'employee', loggedIn: false });
    navigate('/login');
  };

  useEffect(() => {
    if (!user.loggedIn) {
      navigate('/login');
    }
  }, [user.loggedIn, navigate]);

  return (
    <div className="d-flex">
      <div className={`sidebar bg-light border-end p-3 vh-100 position-fixed ${showSidebar ? 'd-block' : 'd-none d-md-block'}`} id="sidebar">
        <h5 className="mb-3">PMS</h5>
        <nav className="nav flex-column">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('dashboard')}</NavLink>
          <NavLink to="/goals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('goals')}</NavLink>
          <NavLink to="/development" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('development')}</NavLink>
          <NavLink to="/feedback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('feedback')}</NavLink>
          <NavLink to="/feedback360" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('feedback360')}</NavLink>
          <NavLink to="/appraisals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t('appraisals')}</NavLink>
        </nav>
      </div>
      <div className="content flex-grow-1">
        <nav className="navbar navbar-light bg-white border-bottom">
          <button className="btn btn-outline-secondary d-md-none" onClick={() => setShowSidebar(!showSidebar)} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="ms-auto d-flex align-items-center">
            <select className="form-select me-2" value={lang} onChange={(e) => setLang(e.target.value)} aria-label={t('language')}>
              <option value="en">EN</option>
              <option value="af">AF</option>
              <option value="zu">ZU</option>
              <option value="xh">XH</option>
            </select>
            <button className="btn btn-outline-danger" onClick={logout}>{t('logout')}</button>
          </div>
        </nav>
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
