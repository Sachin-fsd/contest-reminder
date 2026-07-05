import { redirect } from "next/navigation";

import { getCurrentUser } from "@/utils/auth";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import AnalyticsContent from "@/components/analytics/AnalyticsContent";

export const metadata = {
  title: "Analytics | ContestReminder",
  description: "Contest analytics dashboard",
};

export default async function AnalyticsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <DashboardNavbar user={user} />

      <main className="mx-auto flex max-w-7xl gap-8 px-6 py-8">

        <DashboardSidebar active="analytics" />

        <section className="min-w-0 flex-1">

          <AnalyticsContent user={user} />

        </section>

      </main>
    </>
  );
}