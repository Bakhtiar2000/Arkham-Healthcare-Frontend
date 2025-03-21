"use client";
import DashboardDrawer from "@/components/dashboard/DashboardDrawyer";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }
  return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
