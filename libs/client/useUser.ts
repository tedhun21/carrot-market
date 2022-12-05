import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
    if (data && data.ok && router.pathname === "/enter") {
      router.replace("/profile");
    }
  }, [router, data]);
  return { user: data?.profile, isLoading: !data && !error };
}
