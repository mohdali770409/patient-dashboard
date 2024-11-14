"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardOverviewComponent = ({ data }: { data: any[] }) => {
  // Calculate real statistics from data
  const totalPatients = data?.length;
  const activePatients = data?.filter(patient => patient?.isActive)?.length;
  const curedPatients = data?.filter(patient => patient?.status === "cured")?.length;
  const improvingPatients = data?.filter(patient => patient?.status === "improving")?.length;

  // Statistics cards with real data
  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
    },
    {
      title: "Active Cases",
      value: activePatients,
    },
    {
      title: "Cured Patients",
      value: curedPatients,
    },
  ];

  // Patient status distribution for pie chart
  const statusData = [
    { name: "Improving", value: improvingPatients },
    { name: "Cured", value: curedPatients },
  ];

  // Calculate symptoms frequency
  const symptomsCount: { [key: string]: number } = {};
  data?.forEach(patient => {
    patient.symptomsAndDiseases?.forEach((symptom: string) => {
      symptomsCount[symptom] = (symptomsCount[symptom] || 0) + 1;
    });
  });

  const symptomsData = Object.entries(symptomsCount)
    .map(([name, count]) => ({
      name: name.replace(/_/g, ' '),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6 p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats?.map((stat, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat?.title}</h3>
            <p className="text-2xl font-semibold mt-2">{stat?.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Patient Status Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Common Symptoms */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Common Symptoms</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={symptomsData.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={45} textAnchor="start" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Patients Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Patients</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chief Complaint
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((patient, index) => (
                <tr key={patient._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === 'cured' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.chiefComplaint?.[0]?.complaint || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverviewComponent;