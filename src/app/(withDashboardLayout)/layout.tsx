"use client";

import DashboardDrawer from "@/components/dashboard/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   if (!isLoggedIn()) {
//     return router.push("/login");
//   }
//   return <DashboardDrawer>{children} </DashboardDrawer>;
// };

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
     else setLoading(false);
  }, [router]);
  
  if (loading) return <p>Loading...</p>
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;

