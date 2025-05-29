/**
 * Get all subscriptions for the authenticated user.
 */

import { getUser } from "@/lib/auth";
import getSupabase from "@/lib/supabase-server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const supabase = getSupabase(cookieStore);
    let user;
    try {
        user = await getUser(request);
    } catch (error) {
        // If the user is not authenticated, return a 401 response
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    // get user subscriptions
    const { data: subscriptions, error: subscriptionsError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id);
    if (subscriptionsError) {
        return new Response(JSON.stringify({ error: subscriptionsError.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ subscriptions }), { status: 200 });
}