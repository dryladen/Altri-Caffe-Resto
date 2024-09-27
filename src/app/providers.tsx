// In Next.js, this file would be called: app/providers.tsx
"use client";

import { createClient } from "@/utils/supabase/client";
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import UserContext, { CustomUser } from "@/lib/UserContext";

interface CustomedJwtPayload extends JwtPayload {
  user_role?: string;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState<CustomUser>(null!);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    function saveSession(
      session: Awaited<
        ReturnType<typeof supabase.auth.getSession>
      >["data"]["session"]
    ) {
      const currentUser = session?.user as CustomUser;
      if (session) {
        const jwt = jwtDecode<CustomedJwtPayload>(session.access_token);
        currentUser.user_role = jwt.user_role;
      }
      setUser(currentUser ?? null);
      setUserLoaded(!!currentUser);
    }

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => saveSession(session));

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      saveSession(session);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  };

  return (
    <UserContext.Provider value={{ userLoaded, user, signOut }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserContext.Provider>
  );
}
