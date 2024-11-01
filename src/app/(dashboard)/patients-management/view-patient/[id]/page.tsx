"use client";
import React, { useEffect, useState } from "react";
import { getPatientDataById } from "@/services/patient.service";
import { useToast } from "@/hooks/use-toast";
import AddAndEditPatientComponent from "../../components/AddAndEditPatientComponent";
import PatientDashboard from "../../components/PatientDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Patient = ({ params }: { params: { id: string } }) => {
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const data = await getPatientDataById(params.id);
        if (data) {
          setPatientData(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch patient data",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch patient data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPatientData();
    }
  }, [params.id, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Patient Details
        </h1>
        <p className="text-sm text-gray-500">
          View and edit patient information
        </p>
      </div>
      
      {patientData ? (
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="details">Patient Details</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <PatientDashboard data={patientData} />
          </TabsContent>

          <TabsContent value="details">
            <AddAndEditPatientComponent data={patientData} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No patient data found</p>
        </div>
      )}
    </div>
  );
};

export default Patient;
