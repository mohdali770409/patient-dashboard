import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BeakerIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Waves as WaveformIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HeartPulse as HeartPulseIcon } from "lucide-react";
import { GiLungs as LungIcon } from "react-icons/gi";
interface PatientDashboardProps {
  data: any;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ data }) => {
  // Prepare vital signs data
  const vitalSignsData = data.vitalSigns.map((vs: any) => ({
    date: new Date(vs.date).toLocaleDateString(),
    temperature: vs.temperature,
    bloodPressure: vs.bloodPressure,
    pulseRate: vs.pulseRate,
    spO2: vs.spO2,
    respiratoryRate: vs.respiratoryRate,
  }));

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const latestVitals = vitalSignsData[vitalSignsData.length - 1];

  // Prepare PILCCOD data
  const latestPILCCOD = data.pilccod[data.pilccod.length - 1];
  const pilcodData = [
    { name: "Pallor", value: latestPILCCOD.pallor.value === "positive" ? 1 : 0, description: latestPILCCOD.pallor.description },
    { name: "Icterus", value: latestPILCCOD.icterus.value === "positive" ? 1 : 0, description: latestPILCCOD.icterus.description },
    { name: "Lymphadenopathy", value: latestPILCCOD.lymphadenopathy.value === "positive" ? 1 : 0, description: latestPILCCOD.lymphadenopathy.description },
    { name: "Clubbing", value: latestPILCCOD.clubbing.value === "positive" ? 1 : 0, description: latestPILCCOD.clubbing.description },
    { name: "Cyanosis", value: latestPILCCOD.cyanosis.value === "positive" ? 1 : 0, description: latestPILCCOD.cyanosis.description },
    { name: "Oedema", value: latestPILCCOD.oedema.value === "positive" ? 1 : 0, description: latestPILCCOD.oedema.description },
    { name: "Dehydration", value: latestPILCCOD.dehydration.value === "positive" ? 1 : 0, description: latestPILCCOD.dehydration.description },
  ];

  const PILCCOD_COLORS = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#6366f1", // indigo
    "#a855f7", // purple
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Temperature"
          value={`${latestVitals.temperature}°C`}
          icon={BeakerIcon}
          color="bg-red-500"
        />
        <StatCard
          title="Blood Pressure"
          value={latestVitals.bloodPressure}
          icon={WaveformIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Pulse Rate"
          value={`${latestVitals.pulseRate} bpm`}
          icon={HeartPulseIcon}
          color="bg-purple-500"
        />
        <StatCard
          title="SpO2"
          value={`${latestVitals.spO2}%`}
          icon={LungIcon}
          color="bg-green-500"
        />
        <StatCard
          title="Respiratory Rate"
          value={`${latestVitals.respiratoryRate} bpm`}
          icon={ArrowTrendingUpIcon}
          color="bg-yellow-500"
        />
      </div>

      {/* Vital Signs Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Temperature Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalSignsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  fill="#fee2e2"
                  name="Temperature (°C)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Pressure Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Blood Pressure Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalSignsData.map((vs:any) => ({
                date: vs.date,
                systolic: parseInt(vs.bloodPressure.split('/')[0]),
                diastolic: parseInt(vs.bloodPressure.split('/')[1])
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#3b82f6"
                  name="Systolic"
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#93c5fd"
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pulse Rate Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Pulse Rate Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalSignsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="pulseRate"
                  stroke="#a855f7"
                  fill="#f3e8ff"
                  name="Pulse Rate (bpm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SpO2 Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">SpO2 Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalSignsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="spO2"
                  stroke="#22c55e"
                  fill="#dcfce7"
                  name="SpO2 (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Respiratory Rate Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Respiratory Rate Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalSignsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="respiratoryRate"
                  stroke="#eab308"
                  fill="#fef9c3"
                  name="Respiratory Rate (bpm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* PILCCOD Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PILCCOD Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">PILCCOD Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pilcodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    percent > 0 ? `${name} (${(percent * 100).toFixed(0)}%)` : ""
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pilcodData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PILCCOD_COLORS[index % PILCCOD_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PILCCOD Status Grid */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">PILCCOD Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pilcodData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description || 'No description available'}</p>
                </div>
                <Badge
                  variant={item.value === 1 ? "destructive" : "secondary"}
                  className="ml-2"
                >
                  {item.value === 1 ? "Positive" : "Negative"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* PILCCOD Timeline */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">PILCCOD Timeline</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 gap-4 mb-4">
                {data.pilccod.map((record: any, index: number) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <div className="mt-2 space-y-2">
                      {Object.entries(record)
                        .filter(([key]) => key !== "date" && key !== "_id")
                        .map(([key, value]: [string, any]) => (
                          <div
                            key={key}
                            className={`text-xs px-2 py-1 rounded ${
                              value.value === "positive"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {key}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 