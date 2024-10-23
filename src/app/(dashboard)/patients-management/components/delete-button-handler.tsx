"use client";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { deletePatient } from "@/services/patient.service";

interface DeleteButtonHandlerProps {
  id: string;
  onDelete: (id: string) => void;
}

const DeleteButtonHandler: React.FC<DeleteButtonHandlerProps> = ({
  id,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const deleteHandler = async () => {
    try {
      const response = await deletePatient({
        id,
      });
      console.log(response);
      if (response?.statusText === "OK") {
        setIsOpen(false);
        toast({
          title: "business deleted successfully",
          variant: "default",
        });

        onDelete(id);
      } else {
        toast({
          description: "There was an error deleting the patient.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "An error occurred while deleting the patient.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          <div className="flex items-center ml-2">
            <CircleX className="mr-1 h-4 inline-block" />
            <span className="font-semibold text-sm">Delete</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alert</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Patient?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                No
              </Button>
            </DialogClose>
            <Button onClick={deleteHandler}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteButtonHandler;
