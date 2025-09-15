import { indianStates, getStateData } from '@/data/healthData';
import { BarChart3 } from 'lucide-react';

interface StateComparisonProps {
  currentState: string;
}

export const StateComparison = ({ currentState }: StateComparisonProps) => {
  // Get data for a few key states for comparison
  const comparisonStates = ['Delhi', 'Maharashtra', 'Kerala', 'Arunachal Pradesh', 'Bihar', currentState];
  const uniqueStates = [...new Set(comparisonStates)];
  
  const stateData = uniqueStates.map(state => ({
    name: state,
    data: getStateData(state)
  })).sort((a, b) => a.data.aqi.current - b.data.aqi.current);

  return (
    <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-health-lighter rounded-lg">
          <BarChart3 className="h-5 w-5 text-health-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">State Comparison</h3>
          <p className="text-sm text-muted-foreground">AQI ranking across selected states</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {stateData.map((state, index) => (
          <div 
            key={state.name}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              state.name === currentState ? 'bg-health-light border-health-primary' : 'bg-muted/30 border-border'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === 0 ? 'bg-status-safe text-white' :
                index === 1 ? 'bg-status-caution text-white' :
                index === 2 ? 'bg-status-danger text-white' :
                'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>
              <span className={`font-medium ${state.name === currentState ? 'text-health-dark' : 'text-foreground'}`}>
                {state.name}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">AQI</div>
                <div className={`font-semibold ${
                  state.data.aqi.current > 100 ? 'text-status-danger' :
                  state.data.aqi.current > 50 ? 'text-status-caution' :
                  'text-status-safe'
                }`}>
                  {state.data.aqi.current}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Risk Index</div>
                <div className={`font-semibold ${
                  state.data.healthRiskIndex > 70 ? 'text-status-danger' :
                  state.data.healthRiskIndex > 40 ? 'text-status-caution' :
                  'text-status-safe'
                }`}>
                  {state.data.healthRiskIndex}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="text-sm text-muted-foreground text-center">
          <strong>{currentState}</strong> ranks #{stateData.findIndex(s => s.name === currentState) + 1} out of {stateData.length} states shown
        </div>
      </div>
    </div>
  );
};