import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import currency from "currency.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  CheckCircle,
  ClockAlert,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  UploadIcon,
} from "lucide-react";
import { MouseEvent } from "react";

dayjs.extend(relativeTime);

const Invocies = ({
  invoices,
  setIsQRModalOpen,
  isQRModalOpen,
  handleDownloadInvoice,
  onInvoiceClick,
  setIsUploadReceiptOpen,
}: {
  invoices: any[] | undefined;
  setIsQRModalOpen: (value: boolean) => void;
  isQRModalOpen: boolean;
  handleDownloadInvoice: (id: string) => void;
  onInvoiceClick: (invoice: any) => (m: MouseEvent) => void;
  setIsUploadReceiptOpen: (value: boolean) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="hidden sm:table-cell">
            Status
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(invoices ?? []).map((invoice) => (
          <>
            <TableRow key={invoice.id}>
              <TableCell>
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
              <TableCell className="hidden sm:table-cell">
                {["overdue"].includes(invoice.status) && (
                  <span className="px-2 py-1 rounded-full text-xs bg-red-500 text-white">
                    Overdue
                  </span>
                )}
                {["paid"].includes(invoice.status) && (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500 text-white">
                    Paid
                  </span>
                )}
                {["pending"].includes(invoice.status) && (
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-500 text-white">
                    Pending
                  </span>
                )}
                {!["overdue", "paid", "pending"].includes(invoice.status) && (
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-500 text-white">
                    {invoice.status}
                  </span>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-2 justify-end">
                  {!["paid", "refunded", "cancelled"].includes(
                    invoice.status
                  ) && (
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
                        onClick={() => setIsUploadReceiptOpen(true)}
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={onInvoiceClick(invoice)}
                    title={`View Payments for Invoice #${invoice.id}`}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="sm:hidden">
              <TableCell colSpan={2}>
                <div className="flex items-center gap-2 justify-end">
                  {!["paid", "refunded", "cancelled"].includes(
                    invoice.status
                  ) && (
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
                        onClick={() => setIsUploadReceiptOpen(true)}
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={onInvoiceClick(invoice)}
                    title={`View Payments for Invoice #${invoice.id}`}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default Invocies;
