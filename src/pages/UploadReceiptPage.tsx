import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, ArrowLeft, CalendarIcon } from 'lucide-react';
import useAuth from '@/hooks/use-auth';
import { useUploadReceiptMutation } from '@/api/payment';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useGetInvoiceByIdQuery, useGetNextInvoiceQuery } from '@/api/invoice';
import storage from '@/lib/storage';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import Header from '@/components/app/header';

export default function UploadReceiptPage() {
  const { user } = useAuth({
    loggedIn: storage.get('token') ? true : false,
    token: storage.get('token'),
  });
  const params = new URLSearchParams(window.location.search);
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [paidDate, setPaidDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: nextInvoice, ...nextInvoiceData } = useGetNextInvoiceQuery(storage.get('token'), {
    skip: !user.isSuccess || !user.user || params.get('invoice_id') !== null,
  });

  const { data: currentInvoice, ...currentInvoiceData } = useGetInvoiceByIdQuery({
    token: storage.get('token'),
    id: params.get('invoice_id') ?? '',
  }, {
    skip: !user.isSuccess || !user.user || params.get('invoice_id') === null,
  })
  const [upload] = useUploadReceiptMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Implement actual file upload logic here
      const formData = new FormData();
      formData.append('receipt', file);
      formData.append('amount', String(amount));
      formData.append('invoice_id', invoice?.id ?? '');
      formData.append('paid_date', dayjs(paidDate).format());

      upload({
        token: storage.get('token'),
        body: formData,
      })
      toast({
        title: 'Receipt Uploaded',
        description: 'Your receipt has been successfully uploaded.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Upload Failed',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
    }
  };

  const invoice = params.get('invoice_id') !== null ? currentInvoice : nextInvoice;
  const isLoading = params.get('invoice_id') !== null ? (currentInvoiceData.isLoading || currentInvoiceData.isUninitialized) : (nextInvoiceData.isLoading || nextInvoiceData.isUninitialized);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Header title="Upload Receipt">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>

      </Header>
      <div className="py-4 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Upload Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm">
                  <span>Invoice ID</span>
                  <div
                    className="w-full px-4 py-2 rounded border cursor-default"
                  >
                    {isLoading ? 'Loading...' : `#${invoice?.id} - ${invoice?.booking?.name} - ${invoice?.due_date}`}
                  </div>
                </Label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className='text-sm'>
                  <span>Paid Date</span>
                  <div
                    className="w-full px-4 py-2 rounded border cursor-default"
                  >
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className='flex justify-between items-center'>
                        <div>{dayjs(paidDate).format('DD MMMM YYYY h:mm A')}</div>
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50 cursor-pointer" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={paidDate}
                        onDayClick={(date:Date) => setPaidDate(date)}
                        disabled={(date:Date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        required={false}
                      />
                    </PopoverContent>
                    </Popover>
                  </div>
                </Label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm">
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
                        setAmount(Number(e.target.value))
                      }
                    }
                    className="w-full"
                  />
                </Label>
              </div>
              {/**
               * show image preview
               */}
              <div>
                {file && ["image/jpeg","image/png","image/gif","image/bmp","image/webp"].includes(file.type) && (
                  <div className="grid w-full items-center gap-1.5 relative">
                    <div className="absolute right-1 top-1 w-12 h-12">
                      <button
                        onClick={() => {
                          setFile(null);
                          if (inputRef.current) {
                            inputRef.current.value = '';
                          }
                        }}
                        className="text-black text-xl rounded-full group w-10 h-10 flex justify-center items-center"
                      >
                        <span className='hover:scale-125'>&times;</span>
                      </button> 
                    </div>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Receipt Preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Input
                  ref={inputRef}
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={!file || !invoice?.id} className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4"  /> Upload Receipt
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}