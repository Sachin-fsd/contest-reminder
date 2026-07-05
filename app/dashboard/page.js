import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) redirect("/login");

    return (
        <>
            <DashboardNavbar user={user} />

            <main className="mx-auto flex max-w-7xl gap-8 px-6 py-8">

                <DashboardSidebar />

                <section className="min-w-0 flex-1">
                    <DashboardContent user={user} />
                </section>

            </main>
        </>
    );
}