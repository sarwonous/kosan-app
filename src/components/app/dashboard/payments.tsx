import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import currency from "currency.js";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { Download } from "lucide-react";

dayjs.extend(RelativeTime);

const Payments = (props: {
  open: boolean;
  invoice: any;
  onOpenChange: (open: boolean) => void;
}) => {
  const { invoice } = props;
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payments</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          View all payments made for this invoice.
        </DialogDescription>
        <div>
          {invoice?.payments?.length > 0 ? (
            <ul className="space-y-2 flex-1">
              {Array.isArray(invoice.payments) &&
                invoice.payments.map(
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
                          onClick={() => console.log(payment.id)}
                          className="w-full sm:w-auto"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  )
                )}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No payments made yet.
            </p>
          )}
        </div>
        <DialogFooter>
          teste
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Payments;
