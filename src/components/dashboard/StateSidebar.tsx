import { indianStates } from "@/data/healthData";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface StateSidebarProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
}

export const StateSidebar = ({ selectedState, onStateSelect }: StateSidebarProps) => {
  return (
    <div className="w-64 bg-card border-r border-border h-full overflow-y-auto shadow-card-health">
      <div className="p-4 border-b border-border bg-gradient-header">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Indian States
        </h2>
      </div>
      <div className="p-2">
        {indianStates.map((state) => (
          <button
            key={state}
            onClick={() => onStateSelect(state)}
            className={cn(
              "w-full text-left p-3 rounded-lg mb-1 transition-all duration-200 hover:bg-health-lighter hover:shadow-sm",
              selectedState === state
                ? "bg-health-light text-health-dark font-medium shadow-sm border-l-4 border-health-primary"
                : "text-foreground hover:text-health-dark"
            )}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
};