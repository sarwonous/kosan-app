import { getUser } from "@/lib/auth";
import supabase from "@/lib/supabase-server";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {
    const cookieStore = await cookies();
    const supabaseClient = supabase(cookieStore);
    let user;
    try {
        user = await getUser(request);
    }
    catch (error) {
        // If the user is not authenticated, return a 401 response
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // get user subscriptions
    if (!user.id) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }
    const { data: subscriptions, error: subscriptionsError } = await supabaseClient
        .from("subscriptions")
        .select("id")
        .eq("user_id", user.id);
    if (subscriptionsError) {
        return new Response(JSON.stringify({ error: subscriptionsError.message }), { status: 500 });
    }
    if (subscriptions.length === 0) {
        return new Response(JSON.stringify({ message: "No subscriptions found" }), { status: 200 });
    }
    // get user outstanding invoices
    const { data: outstandingInvoices, error: outstandingInvoicesError } = await supabaseClient
        .from("invoices")
        .select("*")
        .in("subscription_id", subscriptions.map((sub) => sub.id))
        .eq("status", "unpaid");
    if (outstandingInvoicesError) {
        return new Response(JSON.stringify({ error: outstandingInvoicesError.message }), { status: 500 });
    }
    const amoutOutstanding = outstandingInvoices.reduce((total, invoice) => total + invoice.amount, 0);
    console.log("Outstanding Invoices:", outstandingInvoices.length, "Total Amount Outstanding:", amoutOutstanding);
    if (outstandingInvoices.length === 0) {
        return new Response(JSON.stringify({ message: "No outstanding invoices" }), { status: 200 });
    }
    return new Response(JSON.stringify({ outstandingInvoices, amoutOutstanding }), { status: 200 });
}