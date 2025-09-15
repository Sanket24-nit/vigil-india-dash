export interface StateHealthData {
  name: string;
  code: string;
  aqi: {
    current: number;
    trend: Array<{ date: string; value: number }>;
    status: 'safe' | 'caution' | 'danger';
  };
  waterQuality: {
    ph: number;
    turbidity: number;
    contamination: number;
    temperature: number;
  };
  diseaseRates: {
    vectorBorne: number;
    waterBorne: number;
    respiratory: number;
  };
  healthRiskIndex: number;
  forecast: {
    aqi: Array<{ date: string; value: number }>;
    diseases: Array<{ date: string; value: number }>;
  };
}

// Sample health data for Indian states
export const healthData: Record<string, StateHealthData> = {
  "Andhra Pradesh": {
    name: "Andhra Pradesh",
    code: "AP",
    aqi: {
      current: 85,
      trend: [
        { date: "2024-01", value: 92 },
        { date: "2024-02", value: 88 },
        { date: "2024-03", value: 85 },
        { date: "2024-04", value: 90 },
        { date: "2024-05", value: 87 },
        { date: "2024-06", value: 85 }
      ],
      status: 'caution'
    },
    waterQuality: { ph: 7.2, turbidity: 3.5, contamination: 15, temperature: 28 },
    diseaseRates: { vectorBorne: 12, waterBorne: 8, respiratory: 25 },
    healthRiskIndex: 75,
    forecast: {
      aqi: [
        { date: "2024-07", value: 82 },
        { date: "2024-08", value: 80 },
        { date: "2024-09", value: 78 }
      ],
      diseases: [
        { date: "2024-07", value: 42 },
        { date: "2024-08", value: 38 },
        { date: "2024-09", value: 35 }
      ]
    }
  },
  "Arunachal Pradesh": {
    name: "Arunachal Pradesh",
    code: "AR", 
    aqi: {
      current: 45,
      trend: [
        { date: "2024-01", value: 42 },
        { date: "2024-02", value: 44 },
        { date: "2024-03", value: 45 },
        { date: "2024-04", value: 43 },
        { date: "2024-05", value: 46 },
        { date: "2024-06", value: 45 }
      ],
      status: 'safe'
    },
    waterQuality: { ph: 7.8, turbidity: 1.2, contamination: 5, temperature: 22 },
    diseaseRates: { vectorBorne: 8, waterBorne: 3, respiratory: 12 },
    healthRiskIndex: 35,
    forecast: {
      aqi: [
        { date: "2024-07", value: 44 },
        { date: "2024-08", value: 43 },
        { date: "2024-09", value: 42 }
      ],
      diseases: [
        { date: "2024-07", value: 22 },
        { date: "2024-08", value: 20 },
        { date: "2024-09", value: 18 }
      ]
    }
  },
  "Assam": {
    name: "Assam",
    code: "AS",
    aqi: {
      current: 95,
      trend: [
        { date: "2024-01", value: 98 },
        { date: "2024-02", value: 96 },
        { date: "2024-03", value: 95 },
        { date: "2024-04", value: 99 },
        { date: "2024-05", value: 97 },
        { date: "2024-06", value: 95 }
      ],
      status: 'caution'
    },
    waterQuality: { ph: 6.8, turbidity: 4.2, contamination: 20, temperature: 26 },
    diseaseRates: { vectorBorne: 18, waterBorne: 12, respiratory: 28 },
    healthRiskIndex: 82,
    forecast: {
      aqi: [
        { date: "2024-07", value: 92 },
        { date: "2024-08", value: 90 },
        { date: "2024-09", value: 88 }
      ],
      diseases: [
        { date: "2024-07", value: 56 },
        { date: "2024-08", value: 52 },
        { date: "2024-09", value: 48 }
      ]
    }
  },
  "Bihar": {
    name: "Bihar",
    code: "BR",
    aqi: {
      current: 145,
      trend: [
        { date: "2024-01", value: 155 },
        { date: "2024-02", value: 150 },
        { date: "2024-03", value: 145 },
        { date: "2024-04", value: 148 },
        { date: "2024-05", value: 147 },
        { date: "2024-06", value: 145 }
      ],
      status: 'danger'
    },
    waterQuality: { ph: 6.5, turbidity: 5.8, contamination: 35, temperature: 30 },
    diseaseRates: { vectorBorne: 22, waterBorne: 18, respiratory: 35 },
    healthRiskIndex: 92,
    forecast: {
      aqi: [
        { date: "2024-07", value: 142 },
        { date: "2024-08", value: 140 },
        { date: "2024-09", value: 138 }
      ],
      diseases: [
        { date: "2024-07", value: 72 },
        { date: "2024-08", value: 68 },
        { date: "2024-09", value: 65 }
      ]
    }
  },
  "Delhi": {
    name: "Delhi",
    code: "DL",
    aqi: {
      current: 165,
      trend: [
        { date: "2024-01", value: 175 },
        { date: "2024-02", value: 170 },
        { date: "2024-03", value: 165 },
        { date: "2024-04", value: 168 },
        { date: "2024-05", value: 167 },
        { date: "2024-06", value: 165 }
      ],
      status: 'danger'
    },
    waterQuality: { ph: 7.0, turbidity: 4.5, contamination: 25, temperature: 32 },
    diseaseRates: { vectorBorne: 15, waterBorne: 10, respiratory: 45 },
    healthRiskIndex: 95,
    forecast: {
      aqi: [
        { date: "2024-07", value: 162 },
        { date: "2024-08", value: 160 },
        { date: "2024-09", value: 158 }
      ],
      diseases: [
        { date: "2024-07", value: 68 },
        { date: "2024-08", value: 65 },
        { date: "2024-09", value: 62 }
      ]
    }
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    code: "UP",
    aqi: {
      current: 135,
      trend: [
        { date: "2024-01", value: 142 },
        { date: "2024-02", value: 138 },
        { date: "2024-03", value: 135 },
        { date: "2024-04", value: 140 },
        { date: "2024-05", value: 137 },
        { date: "2024-06", value: 135 }
      ],
      status: 'danger'
    },
    waterQuality: { ph: 6.8, turbidity: 5.2, contamination: 30, temperature: 31 },
    diseaseRates: { vectorBorne: 20, waterBorne: 15, respiratory: 32 },
    healthRiskIndex: 88,
    forecast: {
      aqi: [
        { date: "2024-07", value: 132 },
        { date: "2024-08", value: 130 },
        { date: "2024-09", value: 128 }
      ],
      diseases: [
        { date: "2024-07", value: 65 },
        { date: "2024-08", value: 62 },
        { date: "2024-09", value: 58 }
      ]
    }
  }
};

// Add more states with similar data structure
export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

export const getStateData = (stateName: string): StateHealthData => {
  return healthData[stateName] || {
    name: stateName,
    code: stateName.substring(0, 2).toUpperCase(),
    aqi: {
      current: Math.floor(Math.random() * 100) + 50,
      trend: Array.from({ length: 6 }, (_, i) => ({
        date: `2024-${String(i + 1).padStart(2, '0')}`,
        value: Math.floor(Math.random() * 100) + 50
      })),
      status: Math.random() > 0.6 ? 'safe' : Math.random() > 0.3 ? 'caution' : 'danger'
    },
    waterQuality: {
      ph: Math.random() * 2 + 6.5,
      turbidity: Math.random() * 5 + 1,
      contamination: Math.floor(Math.random() * 30) + 5,
      temperature: Math.floor(Math.random() * 15) + 20
    },
    diseaseRates: {
      vectorBorne: Math.floor(Math.random() * 20) + 5,
      waterBorne: Math.floor(Math.random() * 15) + 3,
      respiratory: Math.floor(Math.random() * 30) + 10
    },
    healthRiskIndex: Math.floor(Math.random() * 50) + 30,
    forecast: {
      aqi: Array.from({ length: 3 }, (_, i) => ({
        date: `2024-${String(i + 7).padStart(2, '0')}`,
        value: Math.floor(Math.random() * 100) + 50
      })),
      diseases: Array.from({ length: 3 }, (_, i) => ({
        date: `2024-${String(i + 7).padStart(2, '0')}`,
        value: Math.floor(Math.random() * 50) + 20
      }))
    }
  };
};