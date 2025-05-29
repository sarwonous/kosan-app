import supabase from "@/lib/supabase-server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET(request: Request) {

  const user = await getUser(request);

  if (!user.id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabaseClient = await supabase(cookieStore);
  const { data: subscriptions, error: subscriptionsError } =
    await supabaseClient
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id);

  if (subscriptionsError) {
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }

  const subscriptionIds = subscriptions.map((sub) => sub.id);

  const { data: invoices, error: invoicesError } = await supabaseClient
    .from("invoices")
    .select("*")
    .in("subscription_id", subscriptionIds);

  if (invoicesError) {
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }

  if (invoices.length === 0) {
    return NextResponse.json({ message: "No invoices found" }, { status: 200 });
  }

  // map invoices to include subscription details
  const invoicesWithSubscriptionDetails = invoices.map((invoice) => {
    const subscription = subscriptions.find(
      (sub) => sub.id === invoice.subscription_id
    );
    return {
      ...invoice,
      user: user,
      subscription: subscription
    };
  });

  return NextResponse.json({ invoices: invoicesWithSubscriptionDetails }, { status: 200 });
}
