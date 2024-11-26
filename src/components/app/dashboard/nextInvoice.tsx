import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import currency from "currency.js";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { DownloadIcon, UploadIcon } from "lucide-react";

dayjs.extend(RelativeTime);

const NextInvoice = ({
  invoice,
  setIsQRModalOpen,
  handleDownloadInvoice,
  onUploadReceipt,
}: {
  invoice: any;
  setIsQRModalOpen: (value: boolean) => void;
  handleDownloadInvoice: (id: string) => void;
  onUploadReceipt: () => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <p className="text-2xl font-semibold">
                {currency(invoice?.amount).format({
                  symbol: "Rp",
                  separator: ",",
                  decimal: ".",
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                Due: {dayjs(invoice?.due_date).fromNow()}
              </p>
            </div>
            {!["paid"].includes(invoice.status) && (
              <div className="flex gap-2 flex-wrap flex-grow sm:flex-grow-0">
                <Button
                  variant="default"
                  onClick={() => setIsQRModalOpen(true)}
                >
                  Pay Now
                </Button>
                <Button
                  onClick={onUploadReceipt}
                  variant="outline"
                  className="flex-grow"
                >
                  Upload Receipt
                  <UploadIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div>
            {invoice.payments?.length > 0 ? (
              <ul className="space-y-2">
                {Array.isArray(invoice.payments) &&
                  invoice.payments
                    .filter((_: any, i: number) => i < 1)
                    .map(
                      (payment: {
                        id: string;
                        paid_amount: number;
                        paid_date: string;
                      }) => (
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
                              {dayjs(payment.paid_date).fromNow()}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadInvoice(payment.id)}
                              className="w-full sm:w-auto"
                            >
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      )
                    )}
                {invoice.payments.length > 1 && (
                  <li className="text-sm text-muted-foreground">
                    +{invoice.payments.length - 1} more payments
                  </li>
                )}
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
  );
};

export default NextInvoice;
