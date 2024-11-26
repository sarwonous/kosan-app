import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, CalendarIcon } from "lucide-react";
import { useUploadReceiptMutation } from "@/api/payment";
import { Label } from "@radix-ui/react-dropdown-menu";
import storage from "@/lib/storage";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UploadReceiptPage({
  open,
  invoice,
  onOpenChange,
}: {
  open: boolean;
  invoice: any;
  onOpenChange: (open: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [paidDate, setPaidDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [upload] = useUploadReceiptMutation();

  useEffect(() => {
    // reset
    setFile(null);
    setAmount(0);
    setPaidDate(new Date());
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Implement actual file upload logic here
      const formData = new FormData();
      formData.append("receipt", file);
      formData.append("amount", String(amount));
      formData.append("invoice_id", invoice?.id ?? "");
      formData.append("paid_date", dayjs(paidDate).format());

      try {
        const resp = await upload({
          token: storage.get("token"),
          body: formData,
        }).unwrap();
        if (resp.code !== 200) {
          throw new Error((resp?.message?.receipt ?? []).join(", "));
        } else {
          toast({
            title: "Receipt Uploaded",
            description: "Your receipt has been successfully uploaded.",
          });
          onOpenChange(false);
        }
      } catch (err: any) {
        toast({
          title: "Upload Failed",
          description: err?.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Upload Failed",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payments</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleUpload} className="space-y-6">
            <Label className="flex flex-col gap-1.5">
              <span>Invoice ID</span>
              <div className="w-full px-4 py-2 rounded border cursor-default">
                {`#${invoice?.id} - ${invoice?.booking?.name} - ${invoice?.due_date}`}
              </div>
            </Label>
            <Label className="flex flex-col gap-1.5">
              <span>Paid Date</span>
              <div className="w-full px-4 py-2 rounded border cursor-default">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex justify-between items-center">
                      <div>{dayjs(paidDate).format("DD MMMM YYYY h:mm A")}</div>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50 cursor-pointer" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={paidDate}
                      onDayClick={(date: Date) => setPaidDate(date)}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      required={false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </Label>
            <Label className="flex flex-col gap-1.5">
              <span>Amount</span>
              <Input
                id="amount"
                type="text"
                pattern="[0-9]*"
                value={amount}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    e.preventDefault();
                    return;
                  }
                  setAmount(Number(e.target.value));
                }}
                className="w-full"
              />
            </Label>
            {file &&
              [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/bmp",
                "image/webp",
              ].includes(file.type) && (
                <div className=" relative">
                  <div className="absolute right-1 top-1 w-12 h-12">
                    <button
                      onClick={() => {
                        setFile(null);
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                      className="text-black text-xl rounded-full group w-10 h-10 flex justify-center items-center"
                    >
                      <span className="hover:scale-125">&times;</span>
                    </button>
                  </div>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Receipt Preview"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            <Input
              ref={inputRef}
              id="receipt"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            <Button
              type="submit"
              disabled={!file || !invoice?.id}
              className="w-full sm:w-auto"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Receipt
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
