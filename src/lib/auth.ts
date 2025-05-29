import getSupabase from "./supabase-server";
import { cookies } from "next/headers";

// HOC to get user from JWT in the request headers

export const getUser = async(req: Request) => {
    const cookiesStore = await cookies();
    const supabase = getSupabase(cookiesStore);
    // Extract the JWT from the request headers
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    // Get the user from Supabase using the JWT
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
        throw new Error("Unauthorized");
    }
    return user;
};