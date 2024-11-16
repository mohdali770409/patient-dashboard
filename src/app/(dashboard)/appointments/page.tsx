"use client";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  Calendar,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  Pencil,
  MoreHorizontal,
  X,
  ChevronsUpDown,
} from "lucide-react";
import React from "react";
import { format } from "date-fns";
import DataTable from "@/components/DataTable/DataTable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getUpcomingAppointments, getPastAppointments, getAppointmentsByDate } from "@/services/appointments.service";
import { DatePicker } from "@/components/ui/date-picker";

const AppointmentsPage = () => {
  const columns: ColumnDef<any>[] = [
    {
      id: "patient",
      accessorFn: (row) => `${row.patient.firstName} ${row.patient.lastName}`,
      header: ({ column }) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const name = `${row.original.patient.firstName} ${row.original.patient.lastName}`;
        return (
          <div className="flex items-center py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
              {name.charAt(0)}
            </div>
            <span className="ml-3 font-medium text-gray-700">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "appointmentDate",
      header: ({ column }) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Date
          {column.getIsSorted() &&
            (column.getIsSorted() === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-600">
          {format(new Date(row.original.appointmentDate), "MMM dd, yyyy HH:mm")}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          {column.getIsSorted() &&
            (column.getIsSorted() === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-600">{row.original.location}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {column.getIsSorted() &&
            (column.getIsSorted() === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.status?.toLowerCase();
        const statusConfig: any = {
          scheduled: {
            color: "bg-blue-50 text-blue-700 border-blue-200",
            icon: <Calendar className="h-3 w-3" />,
          },
          completed: {
            color: "bg-green-50 text-green-700 border-green-200",
            icon: <CheckCircle2 className="h-3 w-3" />,
          },
          cancelled: {
            color: "bg-red-50 text-red-700 border-red-200",
            icon: <XCircle className="h-3 w-3" />,
          },
          rescheduled: {
            color: "bg-amber-50 text-amber-700 border-amber-200",
            icon: <Clock className="h-3 w-3" />,
          },
        };

        const config = statusConfig[status] || statusConfig.scheduled;

        return (
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium w-fit",
              "flex items-center gap-1.5 border",
              config.color
            )}
          >
            {config.icon}
            <span className="capitalize">{status}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-slate-500">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log("edit", row.original._id)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Appointment
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("cancel", row.original._id)}
                className="cursor-pointer text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Appointment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [dateAppointments, setDateAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch upcoming appointments
  const fetchUpcomingAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await getUpcomingAppointments();
      setUpcomingAppointments(data?.appointments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch past appointments
  const fetchPastAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await getPastAppointments();
      setPastAppointments(data?.appointments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch appointments for specific date
  const fetchDateAppointments = async (date: Date) => {
    setIsLoading(true);
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const data = await getAppointmentsByDate(formattedDate);
      setDateAppointments(data?.appointments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab changes
  const handleTabChange = (value: string) => {
    if (value === "upcoming") {
      fetchUpcomingAppointments();
    } else if (value === "past") {
      fetchPastAppointments();
    }
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      fetchDateAppointments(date);
    }
  };

  // Initial load of upcoming appointments
  useEffect(() => {
    fetchUpcomingAppointments();
  }, []);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upcoming" className="w-full" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
          {/* <TabsTrigger value="date">Specific Date</TabsTrigger> */}
        </TabsList>

        <TabsContent value="upcoming">
          <DataTable 
            columns={columns} 
            data={upcomingAppointments}
            isLoading={isLoading} 
          />
        </TabsContent>

        <TabsContent value="past">
          <DataTable 
            columns={columns} 
            data={pastAppointments}
            isLoading={isLoading} 
          />
        </TabsContent>

        {/* <TabsContent value="date">
          <div className="mb-4">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
            />
          </div>
          <DataTable 
            columns={columns} 
            data={dateAppointments}
            isLoading={isLoading} 
          />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;
