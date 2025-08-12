import { useState, useContext, useEffect, lazy, Suspense } from 'react';
import { LanguageContext } from '../context/LanguageContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';

const KPIBarChart = lazy(() => import('../components/KPIBarChart.jsx'));
const CompliancePieChart = lazy(() => import('../components/CompliancePieChart.jsx'));

const Reports = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const [reportType, setReportType] = useState('kpi');
  const [dateRange, setDateRange] = useState('last7Days');
  const [department, setDepartment] = useState('finance');
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChartsReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (user.role !== 'hr' && user.role !== 'manager') {
    return <div>Access denied</div>;
  }

  const exportReport = () => {
    console.log('export report', { reportType, dateRange, department });
    toast.success(t('reportExported'), { className: 'bg-primary text-white' });
  };

  return (
    <div>
      <h2 className="mb-4">{t('reports')}</h2>
      <div className="card border-secondary mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="reportType" className="form-label">{t('reportType')}</label>
              <select
                id="reportType"
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                aria-label={t('reportType')}
              >
                <option value="kpi">{t('kpi')}</option>
                <option value="team">{t('teamPerformance')}</option>
                <option value="compliance">{t('compliance')}</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="dateRange" className="form-label">{t('dateRange')}</label>
              <select
                id="dateRange"
                className="form-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                aria-label={t('dateRange')}
              >
                <option value="last7Days">{t('last7Days')}</option>
                <option value="last30Days">{t('last30Days')}</option>
                <option value="thisYear">{t('thisYear')}</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="department" className="form-label">{t('department')}</label>
              <select
                id="department"
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                aria-label={t('department')}
              >
                <option value="finance">{t('finance')}</option>
                <option value="hrDept">{t('hrDept')}</option>
                <option value="it">{t('it')}</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary mt-3" onClick={exportReport}>
            {t('exportReport')}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <Suspense fallback={<div>Loading...</div>}>
            {chartsReady && <KPIBarChart />}
          </Suspense>
        </div>
        <div className="col-md-6 mb-4">
          <Suspense fallback={<div>Loading...</div>}>
            {chartsReady && <CompliancePieChart />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Reports;
