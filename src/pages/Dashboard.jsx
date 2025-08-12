import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { LanguageContext } from '../context/LanguageContext.jsx';
import { mockTasks, mockUsers, mockIdps } from '../utils/mockData.js';

const EmployeeDashboard = () => {
  const { t } = useContext(LanguageContext);
  const count = mockIdps.length;
  const avg = Math.round(mockIdps.reduce((a, b) => a + b.completion, 0) / count);
  return (
    <div>
      <h2>Welcome</h2>
      <div className="row">
        {mockTasks.map((task) => (
          <div className="col-md-4" key={task.id}>
            <div className="card mb-3">
              <div className="card-body">{task.task}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card text-center mt-3" style={{ borderColor: '#0C5E3A' }}>
        <div className="card-body">
          <h5 className="card-title">{t('development')}</h5>
          <p className="card-text">
            {t('plans')}: {count} | {t('avgCompletion')}: {avg}%
          </p>
        </div>
      </div>
    </div>
  );
};

const ManagerDashboard = () => (
  <div>
    <h2>Team Overview</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        {mockUsers.filter((u) => u.role === 'employee').map((u, idx) => {
          const widths = ['w-20', 'w-50', 'w-80'];
          return (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>
                <div className="progress" role="progressbar" aria-valuenow={(idx + 1) * 20} aria-valuemin="0" aria-valuemax="100">
                  <div className={`progress-bar ${widths[idx]}`}></div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const HRDashboard = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card text-center mb-3">
          <div className="card-body">
            <h5 className="card-title">Avg Score</h5>
            <p className="card-text">4.2</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center mb-3">
          <div className="card-body">
            <h5 className="card-title">{t('compliance')}</h5>
            <p className="card-text">
              {t('pfmaAlignment')}: 90%<br />
              {t('sdlTrainingHours')}: 120/150<br />
              {t('popiaAuditStatus')}: {t('compliant')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <h1 className="mb-4">{t('dashboard')}</h1>
      {user.role === 'manager' && <ManagerDashboard />}
      {user.role === 'hr' && <HRDashboard />}
      {user.role === 'employee' && <EmployeeDashboard />}
    </div>
  );
};

export default Dashboard;
