import { Subscription } from "./subscription";

export interface Invoice {
  id: string;
  subscription_id: string;
  amount: number;
  due_date: string;
  status: string;
  document: string;
  created_at: string;
  subscription: Subscription;
}
