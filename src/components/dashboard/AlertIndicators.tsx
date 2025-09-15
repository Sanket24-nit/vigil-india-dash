import { StateHealthData } from '@/data/healthData';
import { AlertCircle, Shield, CheckCircle } from 'lucide-react';

interface AlertIndicatorsProps {
  data: StateHealthData;
}

export const AlertIndicators = ({ data }: AlertIndicatorsProps) => {
  const alerts = [];
  
  // AQI Alert
  if (data.aqi.current > 100) {
    alerts.push({
      type: 'danger',
      title: 'Air Quality Alert',
      message: `AQI level is ${data.aqi.current} - Unhealthy for sensitive groups`,
      icon: AlertCircle,
    });
  } else if (data.aqi.current > 50) {
    alerts.push({
      type: 'caution',
      title: 'Air Quality Warning',
      message: `AQI level is ${data.aqi.current} - Moderate air quality`,
      icon: AlertCircle,
    });
  }
  
  // Water Quality Alert
  if (data.waterQuality.contamination > 25) {
    alerts.push({
      type: 'danger',
      title: 'Water Quality Alert',
      message: `High contamination level: ${data.waterQuality.contamination}%`,
      icon: AlertCircle,
    });
  } else if (data.waterQuality.contamination > 10) {
    alerts.push({
      type: 'caution',
      title: 'Water Quality Warning',
      message: `Moderate contamination level: ${data.waterQuality.contamination}%`,
      icon: AlertCircle,
    });
  }
  
  // Disease Alert
  const totalDiseases = data.diseaseRates.vectorBorne + data.diseaseRates.waterBorne + data.diseaseRates.respiratory;
  if (totalDiseases > 50) {
    alerts.push({
      type: 'danger',
      title: 'High Disease Activity',
      message: `Total disease cases: ${totalDiseases} - Take precautions`,
      icon: AlertCircle,
    });
  }
  
  // Health Risk Alert
  if (data.healthRiskIndex > 70) {
    alerts.push({
      type: 'danger',
      title: 'High Health Risk',
      message: `Risk index: ${data.healthRiskIndex} - Consider preventive measures`,
      icon: AlertCircle,
    });
  }
  
  // If no alerts, show safe status
  if (alerts.length === 0) {
    alerts.push({
      type: 'safe',
      title: 'All Clear',
      message: 'All health indicators are within safe ranges',
      icon: CheckCircle,
    });
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const Icon = alert.icon;
        return (
          <div 
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              alert.type === 'danger' ? 'bg-status-danger/10 border-status-danger text-status-danger' :
              alert.type === 'caution' ? 'bg-status-caution/10 border-status-caution text-status-caution' :
              'bg-status-safe/10 border-status-safe text-status-safe'
            }`}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">{alert.title}</div>
              <div className="text-xs opacity-80">{alert.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};