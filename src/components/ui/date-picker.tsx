import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  date: Date;
  setDate: (date: any) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <ReactDatePicker
      selected={date}
      onChange={setDate}
      dateFormat="dd/MM/yyyy"
      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  );
}; 