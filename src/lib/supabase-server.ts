import { createServerClient } from "@supabase/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";


const getSupabase = (cookieStore: ReadonlyRequestCookies) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(
          name: string,
          value: string,
          options: { path?: string; maxAge?: number; secure?: boolean }
        ) {
          cookieStore.set({ name, value, ...options });
        },
        remove(
          name: string,
          options: { path?: string; maxAge?: number; secure?: boolean }
        ) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
  return supabase;
};
export default getSupabase;
