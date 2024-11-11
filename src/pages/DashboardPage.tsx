import { useEffect, useState } from "react";
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
  ArrowUpRight,
  CheckCircle,
  Download,
  QrCode,
  DownloadIcon,
  ClockAlert,
  UploadIcon,
  CreditCardIcon,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

dayjs.extend(relativeTime);

export default function DashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const { user } = useAuth({
    loggedIn: storage.get("token") ? true : false,
    token: storage.get("token"),
  });

  const { data: invoices } = useGetInvoicesQuery(storage.get("token"), {
    skip: !user.isSuccess || !user.user,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: nextInvoice } = useGetNextInvoiceQuery(storage.get("token"), {
    skip: !user.isSuccess || !user.user,
  });

  const { data: balance } = useGetBalanceQuery(storage.get("token"), {
    skip: !user.isSuccess || !user.user,
  });

  const handleDownloadInvoice = (paymentId: string) => {
    console.log(`Downloading invoice for payment ${paymentId}`);
    toast({
      title: "Invoice Downloaded",
      description: `Invoice for payment #${paymentId} has been downloaded.`,
    });
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
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
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
        {nextInvoice && (
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Next Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold">
                      {currency(nextInvoice?.amount).format({
                        symbol: "Rp",
                        separator: ",",
                        decimal: ".",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {dayjs("2024-10-16T21:22:34+00:00").fromNow()}
                    </p>
                  </div>
                  <Button
                    variant="default"
                    onClick={() => setIsQRModalOpen(true)}
                  >
                    Pay Now
                  </Button>
                </div>
                <Button
                  onClick={() => navigate("/upload-receipt")}
                  variant="outline"
                  className="w-full"
                >
                  Upload Receipt
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <div>
                  {nextInvoice.payments?.length > 0 ? (
                    <ul className="space-y-2">
                      {Array.isArray(nextInvoice.payments) && nextInvoice.payments.map((payment: { id: string; paid_amount: number; date: string }) => (
                        <li
                          key={payment.id}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">
                              {currency(payment.paid_amount).format({
                                symbol: "Rp",
                                separator: ",",
                                decimal: ".",
                              })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {dayjs(payment.date).fromNow()}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadInvoice(payment.id)}
                              className="w-full sm:w-auto"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No payments made yet.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Amount</TableHead>
                <TableHead className="text-left">Due Date</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(invoices ?? []).map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="p-2">
                    <div className="flex items-center">
                      {["overdue"].includes(invoice.status) && (
                        <ClockAlert className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      {["paid"].includes(invoice.status) && (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      {["pending"].includes(invoice.status) && (
                        <ClockAlert className="mr-2 h-4 w-4 text-yellow-500" />
                      )}
                      {currency(
                        ["overdue"].includes(invoice.status)
                          ? invoice.amount
                          : invoice.paid_amount
                      ).format({
                        symbol: `${
                          ["overdue"].includes(invoice.status) ? "-Rp" : "Rp"
                        }`,
                        separator: ",",
                        decimal: ".",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>{dayjs(invoice?.due_date).fromNow()}</TableCell>
                  <TableCell>
                    {['overdue'].includes(invoice.status) && (
                      <span className="px-2 py-1 rounded-full text-xs bg-red-500 text-white">Overdue</span>
                    )}
                    {['paid'].includes(invoice.status) && (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500 text-white">Paid</span>
                    )}
                    {['pending'].includes(invoice.status) && (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500 text-white">Pending</span>
                    )}
                    {!['overdue', 'paid', 'pending'].includes(invoice.status) && (
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-500 text-white">{invoice.status}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-end">
                      {!["paid", "refunded", "cancelled"].includes(invoice.status) && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => setIsQRModalOpen(!isQRModalOpen)}
                            title={`Pay Invoice #${invoice.id}`}
                          >
                            <CreditCardIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(`/upload-receipt?invoice_id=${invoice.id}`)
                            }
                            size="sm"
                            className="w-full sm:w-auto"
                            title={`Upload Receipt for Invoice #${invoice.id}`}
                          >
                            <UploadIcon className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {invoice?.downloadable && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="w-full sm:w-auto"
                          title={`Download Invoice #${invoice.id}`}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent className="sm:max-w-md">
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
    </div>
  );
}
