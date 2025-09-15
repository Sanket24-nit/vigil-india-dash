import { StateHealthData } from '@/data/healthData';
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface HealthRecommendationsProps {
  data: StateHealthData;
}

export const HealthRecommendations = ({ data }: HealthRecommendationsProps) => {
  const getRecommendations = () => {
    const recommendations = [];
    
    // AQI-based recommendations
    if (data.aqi.current > 100) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Air Quality Alert',
        description: 'Limit outdoor activities and use air purifiers indoors. Wear N95 masks when going outside.',
      });
    } else if (data.aqi.current > 50) {
      recommendations.push({
        type: 'caution',
        icon: AlertTriangle,
        title: 'Moderate Air Quality',
        description: 'Sensitive individuals should limit prolonged outdoor exertion.',
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Good Air Quality',
        description: 'Air quality is satisfactory for most people. Enjoy outdoor activities!',
      });
    }
    
    // Water quality recommendations
    if (data.waterQuality.contamination > 25) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Water Safety',
        description: 'Boil water before consumption. Use water purification systems and avoid tap water.',
      });
    } else if (data.waterQuality.contamination > 10) {
      recommendations.push({
        type: 'caution',
        icon: AlertTriangle,
        title: 'Water Precautions',
        description: 'Consider using filtered water for drinking. Monitor water quality regularly.',
      });
    }
    
    // Disease prevention recommendations
    const totalDiseases = data.diseaseRates.vectorBorne + data.diseaseRates.waterBorne + data.diseaseRates.respiratory;
    if (totalDiseases > 50) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Disease Prevention',
        description: 'High disease prevalence. Practice good hygiene, use mosquito repellents, and maintain clean surroundings.',
      });
    }
    
    // Health risk index recommendations
    if (data.healthRiskIndex > 70) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'High Health Risk',
        description: 'Consider relocating temporarily if possible. Consult healthcare providers for personalized advice.',
      });
    }
    
    // General health recommendations
    recommendations.push({
      type: 'info',
      icon: Lightbulb,
      title: 'General Health Tips',
      description: 'Stay hydrated, eat nutritious food, exercise regularly, and get adequate sleep to boost immunity.',
    });
    
    return recommendations.slice(0, 4); // Limit to 4 recommendations
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-health-lighter rounded-lg">
          <Lightbulb className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Recommendations</h3>
          <p className="text-sm text-muted-foreground">Personalized advice based on {data.name} data</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              rec.type === 'warning' ? 'bg-status-danger/5 border-status-danger' :
              rec.type === 'caution' ? 'bg-status-caution/5 border-status-caution' :
              rec.type === 'success' ? 'bg-status-safe/5 border-status-safe' :
              'bg-health-lighter/50 border-health-primary'
            }`}>
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${
                  rec.type === 'warning' ? 'text-status-danger' :
                  rec.type === 'caution' ? 'text-status-caution' :
                  rec.type === 'success' ? 'text-status-safe' :
                  'text-health-primary'
                }`} />
                <div>
                  <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Recommendations are based on current health data and general guidelines. 
          Consult healthcare professionals for personalized medical advice.
        </p>
      </div>
    </div>
  );
};