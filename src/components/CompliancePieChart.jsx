import { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { LanguageContext } from '../context/LanguageContext.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

const CompliancePieChart = () => {
  const { t } = useContext(LanguageContext);
  const data = {
    labels: [t('compliant'), t('nonCompliant')],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['var(--bs-primary)', '#6c757d']
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: t('complianceStatus') }
    }
  };

  return (
    <figure role="img" aria-label={t('complianceStatusAlt')}>
      <Pie data={data} options={options} />
      <figcaption className="text-center">{t('complianceStatus')}</figcaption>
    </figure>
  );
};

export default CompliancePieChart;
