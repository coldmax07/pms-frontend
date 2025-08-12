import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { LanguageContext } from '../context/LanguageContext.jsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const KPIBarChart = () => {
  const { t } = useContext(LanguageContext);
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: t('kpiScores'),
        data: [75, 82, 90, 88],
        backgroundColor: 'var(--bs-primary)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: t('kpiScores') }
    }
  };

  return (
    <figure role="img" aria-label={t('kpiScoresAlt')}>
      <Bar data={data} options={options} />
      <figcaption className="text-center">{t('kpiScores')}</figcaption>
    </figure>
  );
};

export default KPIBarChart;
