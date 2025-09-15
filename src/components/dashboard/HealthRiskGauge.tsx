import { StateHealthData } from '@/data/healthData';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';

interface HealthRiskGaugeProps {
  data: StateHealthData;
}

export const HealthRiskGauge = ({ data }: HealthRiskGaugeProps) => {
  const riskIndex = data.healthRiskIndex;
  const riskLevel = riskIndex < 40 ? 'Low' : riskIndex < 70 ? 'Moderate' : 'High';
  const riskColor = riskIndex < 40 ? 'text-status-safe' : riskIndex < 70 ? 'text-status-caution' : 'text-status-danger';
  const bgColor = riskIndex < 40 ? 'bg-status-safe' : riskIndex < 70 ? 'bg-status-caution' : 'bg-status-danger';
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-health-lighter rounded-lg">
          <Heart className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Risk Index</h3>
          <p className="text-sm text-muted-foreground">Combined risk assessment for {data.name}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Circular Progress Gauge */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(156, 163, 175, 0.2)"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={riskIndex < 40 ? 'rgb(34, 197, 94)' : riskIndex < 70 ? 'rgb(245, 158, 11)' : 'rgb(239, 68, 68)'}
              strokeWidth="2"
              strokeDasharray={`${riskIndex}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${riskColor}`}>{riskIndex}</div>
              <div className="text-xs text-muted-foreground">Risk Score</div>
            </div>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          riskIndex < 40 ? 'bg-status-safe/10 text-status-safe' :
          riskIndex < 70 ? 'bg-status-caution/10 text-status-caution' :
          'bg-status-danger/10 text-status-danger'
        }`}>
          {riskLevel} Risk
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Air Quality Impact</span>
          <span className="text-sm font-medium">{Math.round(data.aqi.current * 0.4)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Water Quality Impact</span>
          <span className="text-sm font-medium">{Math.round(data.waterQuality.contamination * 0.6)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Disease Burden Impact</span>
          <span className="text-sm font-medium">{Math.round((data.diseaseRates.vectorBorne + data.diseaseRates.waterBorne + data.diseaseRates.respiratory) * 0.5)}%</span>
        </div>
      </div>
    </div>
  );
};