import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext.jsx';
import { toast } from 'react-toastify';

const Compliance = () => {
  const { t } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { label: t('pfmaAlignment'), value: '90%' },
    { label: t('sdlTrainingHours'), value: '120/150' },
    { label: t('popiaAuditStatus'), value: t('compliant') },
  ];

  const logs = [
    { user: 'Alice', action: 'Goal Approved', timestamp: '2024-04-01 10:00' },
    { user: 'Bob', action: 'Report Generated', timestamp: '2024-04-02 12:30' },
    { user: 'Cara', action: 'Policy Updated', timestamp: '2024-04-03 09:15' },
    { user: 'Dan', action: 'Goal Rejected', timestamp: '2024-04-03 11:45' },
    { user: 'Eve', action: 'Goal Approved', timestamp: '2024-04-04 14:20' },
  ];

  const generateReport = () => {
    console.log('generate compliance report', { metrics });
    toast.success(t('reportGenerated'), { className: 'bg-primary text-white' });
  };

  if (loading) {
    return <div className="text-center" aria-busy="true" aria-live="polite">Loading...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">{t('compliance')}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4" aria-label={t('compliance')}>
        {metrics.map((m) => (
          <div className="col" key={m.label}>
            <div className="card text-center" tabIndex="0" aria-label={`${m.label}: ${m.value}`}>
              <div className="card-body">
                <h5 className="card-title">{m.label}</h5>
                <p className="card-text">{m.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3>{t('auditLog')}</h3>
      <table className="table" aria-label={t('auditLog')}>
        <thead>
          <tr>
            <th scope="col">{t('user')}</th>
            <th scope="col">{t('action')}</th>
            <th scope="col">{t('timestamp')}</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={generateReport}>{t('generateReport')}</button>
    </div>
  );
};

export default Compliance;
