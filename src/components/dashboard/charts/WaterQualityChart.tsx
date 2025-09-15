import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StateHealthData } from '@/data/healthData';
import { Droplets } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WaterQualityChartProps {
  data: StateHealthData;
}

export const WaterQualityChart = ({ data }: WaterQualityChartProps) => {
  const { waterQuality } = data;
  
  const chartData = {
    labels: ['pH Level', 'Turbidity', 'Contamination', 'Temperature'],
    datasets: [
      {
        data: [
          waterQuality.ph * 10, // Normalize pH to 0-100 scale
          waterQuality.turbidity * 10, // Normalize turbidity
          waterQuality.contamination, // Already 0-100
          waterQuality.temperature * 2, // Normalize temperature
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // Blue for pH
          'rgba(16, 185, 129, 0.8)', // Green for turbidity
          'rgba(239, 68, 68, 0.8)', // Red for contamination
          'rgba(245, 158, 11, 0.8)', // Orange for temperature
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
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
            let value = '';
            switch(label) {
              case 'pH Level':
                value = `${waterQuality.ph.toFixed(1)} pH`;
                break;
              case 'Turbidity':
                value = `${waterQuality.turbidity.toFixed(1)} NTU`;
                break;
              case 'Contamination':
                value = `${waterQuality.contamination}%`;
                break;
              case 'Temperature':
                value = `${waterQuality.temperature}°C`;
                break;
            }
            return `${label}: ${value}`;
          }
        }
      },
    },
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-health-lighter rounded-lg">
          <Droplets className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Water Quality Parameters</h3>
          <p className="text-sm text-muted-foreground">Current water quality metrics for {data.name}</p>
        </div>
      </div>
      
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">pH Level</div>
          <div className={`text-lg font-semibold ${
            waterQuality.ph >= 6.5 && waterQuality.ph <= 8.5 ? 'text-status-safe' : 'text-status-caution'
          }`}>
            {waterQuality.ph.toFixed(1)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Contamination</div>
          <div className={`text-lg font-semibold ${
            waterQuality.contamination < 10 ? 'text-status-safe' : 
            waterQuality.contamination < 25 ? 'text-status-caution' : 'text-status-danger'
          }`}>
            {waterQuality.contamination}%
          </div>
        </div>
      </div>
    </div>
  );
};