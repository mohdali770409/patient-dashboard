import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const AddressComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Address</h1>
      <div className="flex flex-col md:justify-between md:flex-row md:gap-20 mt-4">
        <div className="md:w-full">
          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Street</FormLabel>
                <FormControl>
                  <Input placeholder="Enter street/village" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={control}
            name="locality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Locality</FormLabel>
                <FormControl>
                  <Input placeholder="Locality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col md:justify-between md:flex-row md:gap-20">
        <div className="w-full">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col md:justify-between md:flex-row md:gap-20">
        <div className="w-1/2 pr-10">
          <FormField
            control={control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">PIN Code</FormLabel>
                <FormControl>
                  <Input placeholder="PIN Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;