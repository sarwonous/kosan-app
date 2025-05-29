/**
 * Get all subscriptions for the authenticated user.
 */

import { getUser } from "@/lib/auth";
import supabase from "@/lib/supabase-server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const supabaseClient = supabase(cookieStore);
    let user;
    try {
        user = await getUser(request);
    } catch (error) {
        // If the user is not authenticated, return a 401 response
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    // get user subscriptions
    const { count, status, statusText, data: subscriptions, error: subscriptionsError } = await supabaseClient
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
    console.log("Subscriptions:", count, status, statusText, JSON.stringify(subscriptions, null, 2));
    if (subscriptionsError) {
        return new Response(JSON.stringify({ error: subscriptionsError.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ subscriptions }), { status: 200 });
}