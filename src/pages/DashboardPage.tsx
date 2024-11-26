import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import currency from "currency.js";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/use-auth";
import storage from "@/lib/storage";
import {
  useGetInvoicesQuery,
  useGetNextInvoiceQuery,
  useGetBalanceQuery,
} from "@/api/invoice";
import relativeTime from "dayjs/plugin/relativeTime";
import Header from "@/components/app/header";
import Payments from "@/components/app/dashboard/payments";
import NextInvoice from "@/components/app/dashboard/nextInvoice";
import UploadReceiptPage from "@/components/app/dashboard/uploadReceipt";
import Invocies from "@/components/app/dashboard/invoices";

dayjs.extend(relativeTime);

export default function DashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSelectedInvoice, setCurrentSelectedInvoice] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isPaymentListOpen, setIsPaymentListOpen] = useState(false);
  const [isUploadReceiptOpen, setIsUploadReceiptOpen] = useState(false);
  const { user } = useAuth({
    loggedIn: storage.get("token") ? true : false,
    token: storage.get("token"),
  });

  const { data: invoices, refetch: refetchInvoices, isUninitialized: isInvoicesUninitialized } = useGetInvoicesQuery(storage.get("token"), {
    skip: !user.isSuccess || !user.user,
    refetchOnMountOrArgChange: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: nextInvoice, refetch: refetchNextInvoice, isUninitialized: isNextInvoiceUninitialized } = useGetNextInvoiceQuery(storage.get("token"), {
    skip: !user.isSuccess || !user.user,
    refetchOnMountOrArgChange: true,
  });

  const { data: balance, refetch: refetchBalance, isUninitialized: isBalanceUninitialized } = useGetBalanceQuery(storage.get("token"), {
    skip: !user.isSuccess || !user.user,
    refetchOnMountOrArgChange: true,
  });

  const handleDownloadInvoice = (paymentId: string) => {
    console.log(`Downloading invoice for payment ${paymentId}`);
    toast({
      title: "Invoice Downloaded",
      description: `Invoice for payment #${paymentId} has been downloaded.`,
    });
  };

  const fetchAll = useCallback(() => {
    if (!isInvoicesUninitialized) {
      refetchInvoices();
    }
    if (!isNextInvoiceUninitialized) {
      refetchNextInvoice();
    }
    if (!isBalanceUninitialized) {
      refetchBalance();
    }
  }, [refetchInvoices, refetchNextInvoice, refetchBalance, isInvoicesUninitialized, isNextInvoiceUninitialized, isBalanceUninitialized]);


  useEffect(() => {
    if (!isUploadReceiptOpen) {
      fetchAll();
    }
  }, [isUploadReceiptOpen, fetchAll]);

  const onInvoiceClick = (invoice: any) => (e:React.MouseEvent) => {
    e.preventDefault();
    setCurrentSelectedInvoice(invoice);
    setIsPaymentListOpen(true);
  };

  useEffect(() => {
    if (!user.isLoading && !user.isSuccess) {
      navigate("/");
    }
  }, [user.isLoading, user.isSuccess, navigate]);

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <Header title="Dashboard">
        <Button variant="outline" onClick={() => navigate("/profile")}>
          Profile
        </Button>
      </Header>
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold flex items-center">
              {currency(balance?.balance).format({
                symbol: "Rp",
                separator: ",",
                decimal: ".",
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        {nextInvoice && (
          <NextInvoice
            invoice={nextInvoice}
            setIsQRModalOpen={setIsQRModalOpen}
            handleDownloadInvoice={handleDownloadInvoice}
            onUploadReceipt={() => setIsUploadReceiptOpen(true)}
          />
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Invocies
            invoices={invoices}
            onInvoiceClick={onInvoiceClick}
            handleDownloadInvoice={handleDownloadInvoice}
            isQRModalOpen={isQRModalOpen}
            setIsQRModalOpen={setIsQRModalOpen}
            setIsUploadReceiptOpen={setIsUploadReceiptOpen}            
          />
        </CardContent>
      </Card>
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Code to Pay</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <QrCode size={200} />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Scan this QR code with your mobile banking app to make the payment.
          </p>
        </DialogContent>
      </Dialog>
      <Payments
        open={isPaymentListOpen}
        onOpenChange={setIsPaymentListOpen}
        invoice={currentSelectedInvoice}
      />
      <UploadReceiptPage
        open={isUploadReceiptOpen}
        onOpenChange={setIsUploadReceiptOpen}
        invoice={nextInvoice}
      />
    </div>
  );
}
