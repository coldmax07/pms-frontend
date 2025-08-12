import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext.jsx';
import { UserContext } from '../context/UserContext.jsx';

const Login = () => {
  const { t, lang, setLang } = useContext(LanguageContext);
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) err.email = true;
    if (!password) err.password = true;
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      console.log('login', { email, password });
      const role = email.includes('manager') ? 'manager' : email.includes('hr') ? 'hr' : 'employee';
      setUser({ role, loggedIn: true });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar bg-white border-bottom justify-content-end">
        <select className="form-select w-auto me-3" value={lang} onChange={(e) => setLang(e.target.value)} aria-label={t('language')}>
          <option value="en">EN</option>
          <option value="af">AF</option>
          <option value="zu">ZU</option>
          <option value="xh">XH</option>
        </select>
      </nav>
      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card w-100 login-card">
          <div className="card-body">
            <h5 className="card-title mb-3">{t('login')}</h5>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">{t('email')}</label>
                <input type="email" id="email" className={`form-control ${error.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} required aria-required="true" />
                <div className="invalid-feedback">Invalid email</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">{t('password')}</label>
                <input type="password" id="password" className={`form-control ${error.password ? 'is-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} required aria-required="true" />
                <div className="invalid-feedback">Required</div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                {t('login')}
              </button>
              <button type="button" className="btn btn-outline-secondary w-100 mt-2">{t('loginWithSSO')}</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="bg-light text-center py-3">
        <small>POPIA notice <Link to="/privacy">Privacy Policy</Link></small>
      </footer>
    </div>
  );
};

export default Login;
