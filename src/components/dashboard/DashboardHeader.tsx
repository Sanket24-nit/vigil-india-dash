import { Activity, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  selectedState: string;
  timeRange: 'daily' | 'monthly' | 'yearly';
  onTimeRangeChange: (range: 'daily' | 'monthly' | 'yearly') => void;
}

export const DashboardHeader = ({ selectedState, timeRange, onTimeRangeChange }: DashboardHeaderProps) => {
  return (
    <div className="w-full bg-gradient-header shadow-health">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                National Health Surveillance Dashboard
              </h1>
              <p className="text-white/80 text-sm">
                Real-time health monitoring across India
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white text-sm">
              <Calendar className="h-4 w-4" />
              <span>Current State: <strong>{selectedState}</strong></span>
            </div>
            
            <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
              <Button
                size="sm"
                variant={timeRange === 'daily' ? 'secondary' : 'ghost'}
                onClick={() => onTimeRangeChange('daily')}
                className={timeRange === 'daily' ? 'text-health-dark' : 'text-white hover:text-health-dark hover:bg-white/20'}
              >
                Daily
              </Button>
              <Button
                size="sm"
                variant={timeRange === 'monthly' ? 'secondary' : 'ghost'}
                onClick={() => onTimeRangeChange('monthly')}
                className={timeRange === 'monthly' ? 'text-health-dark' : 'text-white hover:text-health-dark hover:bg-white/20'}
              >
                Monthly
              </Button>
              <Button
                size="sm"
                variant={timeRange === 'yearly' ? 'secondary' : 'ghost'}
                onClick={() => onTimeRangeChange('yearly')}
                className={timeRange === 'yearly' ? 'text-health-dark' : 'text-white hover:text-health-dark hover:bg-white/20'}
              >
                Yearly
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};