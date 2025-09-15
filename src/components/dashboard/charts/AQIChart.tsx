import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { StateHealthData } from '@/data/healthData';
import { Wind } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AQIChartProps {
  data: StateHealthData;
}

export const AQIChart = ({ data }: AQIChartProps) => {
  const chartData = {
    labels: data.aqi.trend.map(item => item.date),
    datasets: [
      {
        label: 'AQI Level',
        data: data.aqi.trend.map(item => item.value),
        backgroundColor: data.aqi.trend.map(item => 
          item.value > 100 ? 'rgba(239, 68, 68, 0.8)' : 
          item.value > 50 ? 'rgba(245, 158, 11, 0.8)' : 
          'rgba(34, 197, 94, 0.8)'
        ),
        borderColor: data.aqi.trend.map(item => 
          item.value > 100 ? 'rgb(239, 68, 68)' : 
          item.value > 50 ? 'rgb(245, 158, 11)' : 
          'rgb(34, 197, 94)'
        ),
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            const status = value > 100 ? 'Unhealthy' : value > 50 ? 'Moderate' : 'Good';
            return `AQI: ${value} (${status})`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)',
        },
      },
    },
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-health-lighter rounded-lg">
          <Wind className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Air Quality Index Trends</h3>
          <p className="text-sm text-muted-foreground">Monthly AQI levels for {data.name}</p>
        </div>
      </div>
      
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Current AQI: <span className={`font-semibold ${
            data.aqi.current > 100 ? 'text-status-danger' : 
            data.aqi.current > 50 ? 'text-status-caution' : 
            'text-status-safe'
          }`}>{data.aqi.current}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          data.aqi.status === 'danger' ? 'bg-status-danger/10 text-status-danger' :
          data.aqi.status === 'caution' ? 'bg-status-caution/10 text-status-caution' :
          'bg-status-safe/10 text-status-safe'
        }`}>
          {data.aqi.status.toUpperCase()}
        </div>
      </div>
    </div>
  );
};