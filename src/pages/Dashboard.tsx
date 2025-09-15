import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StateSidebar } from '@/components/dashboard/StateSidebar';
import { AQIChart } from '@/components/dashboard/charts/AQIChart';
import { WaterQualityChart } from '@/components/dashboard/charts/WaterQualityChart';
import { DiseaseChart } from '@/components/dashboard/charts/DiseaseChart';
import { HealthRiskGauge } from '@/components/dashboard/HealthRiskGauge';
import { ForecastChart } from '@/components/dashboard/ForecastChart';
import { StateComparison } from '@/components/dashboard/StateComparison';
import { HealthRecommendations } from '@/components/dashboard/HealthRecommendations';
import { AlertIndicators } from '@/components/dashboard/AlertIndicators';
import { getStateData } from '@/data/healthData';

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState('Delhi');
  const [timeRange, setTimeRange] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  
  const stateData = getStateData(selectedState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-health-lighter/20">
      <DashboardHeader 
        selectedState={selectedState}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />
      
      <div className="flex">
        <StateSidebar 
          selectedState={selectedState}
          onStateSelect={setSelectedState}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Alert Indicators Row */}
            <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Health Status Alerts</h2>
              <AlertIndicators data={stateData} />
            </div>
            
            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AQIChart data={stateData} />
              <WaterQualityChart data={stateData} />
              <DiseaseChart data={stateData} />
            </div>
            
            {/* Health Risk and Forecast Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthRiskGauge data={stateData} />
              <ForecastChart data={stateData} />
            </div>
            
            {/* State Comparison and Recommendations Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StateComparison currentState={selectedState} />
              <HealthRecommendations data={stateData} />
            </div>
            
            {/* Additional Information */}
            <div className="bg-card rounded-xl p-6 shadow-card-health border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-health-primary">{stateData.aqi.current}</div>
                  <div className="text-sm text-muted-foreground">Current AQI</div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                    stateData.aqi.status === 'danger' ? 'bg-status-danger/10 text-status-danger' :
                    stateData.aqi.status === 'caution' ? 'bg-status-caution/10 text-status-caution' :
                    'bg-status-safe/10 text-status-safe'
                  }`}>
                    {stateData.aqi.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-health-primary">{stateData.waterQuality.contamination}%</div>
                  <div className="text-sm text-muted-foreground">Water Contamination</div>
                  <div className="text-xs text-muted-foreground mt-1">pH: {stateData.waterQuality.ph.toFixed(1)}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-health-primary">
                    {stateData.diseaseRates.vectorBorne + stateData.diseaseRates.waterBorne + stateData.diseaseRates.respiratory}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Disease Cases</div>
                  <div className="text-xs text-muted-foreground mt-1">per 1000 population</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;