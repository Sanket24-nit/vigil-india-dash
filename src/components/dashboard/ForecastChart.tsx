import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { StateHealthData } from '@/data/healthData';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastChartProps {
  data: StateHealthData;
}

export const ForecastChart = ({ data }: ForecastChartProps) => {
  const chartData = {
    labels: data.forecast.aqi.map(item => item.date),
    datasets: [
      {
        label: 'AQI Forecast',
        data: data.forecast.aqi.map(item => item.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Disease Cases Forecast',
        data: data.forecast.diseases.map(item => item.value),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: 'rgba(75, 85, 99, 0.8)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-health-lighter rounded-lg">
          <TrendingUp className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Trends Forecast</h3>
          <p className="text-sm text-muted-foreground">Predicted health metrics for {data.name}</p>
        </div>
      </div>
      
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">AQI Trend</div>
          <div className="text-lg font-semibold text-blue-600">
            {data.forecast.aqi[data.forecast.aqi.length - 1].value < data.aqi.current ? '↓ Improving' : '↑ Worsening'}
          </div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">Disease Trend</div>
          <div className="text-lg font-semibold text-red-600">
            {data.forecast.diseases[data.forecast.diseases.length - 1].value < (data.diseaseRates.vectorBorne + data.diseaseRates.waterBorne + data.diseaseRates.respiratory) ? '↓ Declining' : '↑ Rising'}
          </div>
        </div>
      </div>
    </div>
  );
};