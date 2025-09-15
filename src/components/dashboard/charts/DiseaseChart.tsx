import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StateHealthData } from '@/data/healthData';
import { Shield } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DiseaseChartProps {
  data: StateHealthData;
}

export const DiseaseChart = ({ data }: DiseaseChartProps) => {
  const { diseaseRates } = data;
  
  const chartData = {
    labels: ['Vector-borne', 'Water-borne', 'Respiratory'],
    datasets: [
      {
        data: [diseaseRates.vectorBorne, diseaseRates.waterBorne, diseaseRates.respiratory],
        backgroundColor: [
          'rgba(139, 69, 19, 0.8)', // Brown for vector-borne
          'rgba(30, 144, 255, 0.8)', // Blue for water-borne
          'rgba(255, 99, 132, 0.8)', // Pink for respiratory
        ],
        borderColor: [
          'rgb(139, 69, 19)',
          'rgb(30, 144, 255)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: 'rgba(75, 85, 99, 0.8)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context: any) {
            const label = context.label;
            const value = context.parsed;
            const total = diseaseRates.vectorBorne + diseaseRates.waterBorne + diseaseRates.respiratory;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} cases (${percentage}%)`;
          }
        }
      },
    },
  };

  const total = diseaseRates.vectorBorne + diseaseRates.waterBorne + diseaseRates.respiratory;

  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-health-lighter rounded-lg">
          <Shield className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Disease Rate Distribution</h3>
          <p className="text-sm text-muted-foreground">Disease prevalence by category in {data.name}</p>
        </div>
      </div>
      
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Cases</span>
          <span className="font-semibold text-lg">{total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Most Prevalent</span>
          <span className="font-medium text-status-caution">
            {diseaseRates.respiratory > diseaseRates.vectorBorne && diseaseRates.respiratory > diseaseRates.waterBorne ? 'Respiratory' :
             diseaseRates.vectorBorne > diseaseRates.waterBorne ? 'Vector-borne' : 'Water-borne'}
          </span>
        </div>
      </div>
    </div>
  );
};